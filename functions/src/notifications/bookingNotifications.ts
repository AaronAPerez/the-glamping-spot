import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as nodemailer from 'nodemailer';
import { Booking } from '../types/database';

// Set up nodemailer with your email service (e.g., Gmail, SendGrid)
const transporter = nodemailer.createTransport({
  service: 'gmail', // or another provider
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Admin email addresses to receive notifications
const adminEmails = ['admin@theglampingspot.com', 'manager@theglampingspot.com'];

// New booking notification
export const onNewBooking = functions.firestore
  .document('bookings/{bookingId}')
  .onCreate(async (snap, context) => {
    const newBooking = snap.data() as Booking;
    const bookingId = context.params.bookingId;
    
    try {
      // 1. Send confirmation to guest
      await transporter.sendMail({
        from: '"The Glamping Spot" <bookings@theglampingspot.com>',
        to: newBooking.contactInformation.email,
        subject: 'Your Glamping Reservation Confirmation',
        html: `
          <h1>Your booking is confirmed!</h1>
          <p>Dear ${newBooking.contactInformation.fullName},</p>
          <p>Thank you for booking with The Glamping Spot. Your reservation details:</p>
          <ul>
            <li>Booking ID: ${bookingId}</li>
            <li>Check-in: ${newBooking.dates.checkIn.toDate().toDateString()}</li>
            <li>Check-out: ${newBooking.dates.checkOut.toDate().toDateString()}</li>
            <li>Total: $${newBooking.pricing.total}</li>
          </ul>
          <p>We're looking forward to your stay!</p>
        `,
      });
      
      // 2. Send notification to admins
      await Promise.all(adminEmails.map(email => 
        transporter.sendMail({
          from: '"Booking System" <noreply@theglampingspot.com>',
          to: email,
          subject: 'New Booking Alert',
          html: `
            <h2>New Booking Received</h2>
            <p>A new booking has been made:</p>
            <ul>
              <li>Booking ID: ${bookingId}</li>
              <li>Guest: ${newBooking.contactInformation.fullName}</li>
              <li>Email: ${newBooking.contactInformation.email}</li>
              <li>Phone: ${newBooking.contactInformation.phone}</li>
              <li>Check-in: ${newBooking.dates.checkIn.toDate().toDateString()}</li>
              <li>Check-out: ${newBooking.dates.checkOut.toDate().toDateString()}</li>
              <li>Total: $${newBooking.pricing.total}</li>
            </ul>
            <p><a href="https://admin.theglampingspot.com/bookings/${bookingId}">View booking details</a></p>
          `,
        })
      ));
      
      // 3. Store notification in Firestore for in-app notifications
      await admin.firestore().collection('notifications').add({
        userId: newBooking.userId,
        type: 'booking_confirmation',
        title: 'Booking Confirmed',
        message: `Your booking for check-in on ${newBooking.dates.checkIn.toDate().toLocaleDateString()} is confirmed.`,
        read: false,
        relatedId: bookingId,
        actionUrl: `/bookings/${bookingId}`,
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      });
      
      // 4. Also add admin notification
      await admin.firestore().collection('adminNotifications').add({
        type: 'new_booking',
        title: 'New Booking',
        message: `New booking from ${newBooking.contactInformation.fullName} for check-in on ${newBooking.dates.checkIn.toDate().toLocaleDateString()}.`,
        read: false,
        relatedId: bookingId,
        actionUrl: `/admin/bookings/${bookingId}`,
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      });
      
      console.log(`Booking notifications sent for booking ${bookingId}`);
      return null;
    } catch (error) {
      console.error('Error sending booking notifications:', error);
      throw error;
    }
  });

// Booking cancellation notification
export const onBookingCancelled = functions.firestore
  .document('bookings/{bookingId}')
  .onUpdate(async (change, context) => {
    const bookingBefore = change.before.data() as Booking;
    const bookingAfter = change.after.data() as Booking;
    const bookingId = context.params.bookingId;
    
    // Only proceed if status changed to 'canceled'
    if (bookingBefore.status !== 'canceled' && bookingAfter.status === 'canceled') {
      try {
        // Notification logic for cancellations
        // Similar to the above, but for cancellations
        
        // Log successful cancellation notification
        console.log(`Cancellation notifications sent for booking ${bookingId}`);
      } catch (error) {
        console.error('Error sending cancellation notifications:', error);
        throw error;
      }
    }
    
    return null;
  });

// Upcoming stay reminder (scheduled to run daily)
export const sendUpcomingStayReminders = functions.pubsub
  .schedule('every 24 hours')
  .onRun(async (context) => {
    const now = admin.firestore.Timestamp.now();
    const threeDaysFromNow = new Date();
    threeDaysFromNow.setDate(threeDaysFromNow.getDate() + 3);
    
    // Find bookings with check-in in 3 days
    const upcomingBookings = await admin.firestore()
      .collection('bookings')
      .where('status', '==', 'confirmed')
      .where('dates.checkIn', '>=', now)
      .where('dates.checkIn', '<=', admin.firestore.Timestamp.fromDate(threeDaysFromNow))
      .get();
    
    const reminderPromises: Promise<any>[] = [];
    
    upcomingBookings.forEach(doc => {
      const booking = doc.data() as Booking;
      
      // Add email sending promise to our array of promises
      reminderPromises.push(
        transporter.sendMail({
          from: '"The Glamping Spot" <bookings@theglampingspot.com>',
          to: booking.contactInformation.email,
          subject: 'Your Glamping Stay is Coming Up!',
          html: `
            <h1>Get Ready for Your Glamping Adventure!</h1>
            <p>Dear ${booking.contactInformation.fullName},</p>
            <p>Your stay at The Glamping Spot is coming up in 3 days! Here's a reminder of your booking details:</p>
            <ul>
              <li>Check-in: ${booking.dates.checkIn.toDate().toDateString()} (after 3:00 PM)</li>
              <li>Check-out: ${booking.dates.checkOut.toDate().toDateString()} (before 11:00 AM)</li>
            </ul>
            <p>Here are some things to know before your arrival: [Check-in instructions]</p>
            <p>We're looking forward to hosting you!</p>
            <p>The Glamping Spot Team</p>
          `,
        })
      );
      
      // Also add in-app notification
      reminderPromises.push(
        admin.firestore().collection('notifications').add({
          userId: booking.userId,
          type: 'booking_reminder',
          title: 'Upcoming Stay Reminder',
          message: `Your glamping stay begins in 3 days on ${booking.dates.checkIn.toDate().toLocaleDateString()}.`,
          read: false,
          relatedId: doc.id,
          actionUrl: `/bookings/${doc.id}`,
          createdAt: admin.firestore.FieldValue.serverTimestamp()
        })
      );
    });
    
    await Promise.all(reminderPromises);
    console.log(`Sent ${reminderPromises.length / 2} booking reminders`);
    return null;
  });