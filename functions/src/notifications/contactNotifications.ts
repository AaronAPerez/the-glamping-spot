import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as nodemailer from 'nodemailer';

// Same email transporter setup as above

export const onContactFormSubmission = functions.https.onCall(async (data, context) => {
  const { name, email, phone, message, subject } = data;
  
  if (!name || !email || !message) {
    throw new functions.https.HttpsError(
      'invalid-argument', 
      'Missing required fields'
    );
  }
  
  try {
    // Send to site administrators
    await Promise.all(adminEmails.map(adminEmail => 
      transporter.sendMail({
        from: '"Website Contact Form" <noreply@theglampingspot.com>',
        to: adminEmail,
        subject: `New Contact: ${subject || 'General Inquiry'}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>From:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `,
        replyTo: email
      })
    ));
    
    // Send confirmation to user
    await transporter.sendMail({
      from: '"The Glamping Spot" <contact@theglampingspot.com>',
      to: email,
      subject: 'We Received Your Message',
      html: `
        <h1>Thank You for Contacting Us</h1>
        <p>Dear ${name},</p>
        <p>We've received your message and will get back to you as soon as possible.</p>
        <p>For reference, here's what you sent us:</p>
        <p><em>${message}</em></p>
        <p>The Glamping Spot Team</p>
      `
    });
    
    // Add to admin notifications in Firestore
    await admin.firestore().collection('adminNotifications').add({
      type: 'contact_form',
      title: 'New Contact Form Submission',
      message: `New message from ${name} (${email})`,
      read: false,
      contactDetails: { name, email, phone, message, subject },
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });
    
    return { success: true };
  } catch (error) {
    console.error('Error sending contact form notification:', error);
    throw new functions.https.HttpsError(
      'internal', 
      'Failed to process contact form'
    );
  }
});