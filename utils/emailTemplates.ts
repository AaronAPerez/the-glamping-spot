export interface EmailTemplateData {
    [key: string]: any;
  }
  
  export function getBookingConfirmationTemplate(data: EmailTemplateData): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Booking Confirmation</title>
        <style>
          /* Email-friendly styles */
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #10b981; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background-color: #f9fafb; }
          .footer { padding: 20px; text-align: center; font-size: 12px; color: #6b7280; }
          .button { background-color: #10b981; color: white; padding: 12px 20px; text-decoration: none; 
                   border-radius: 4px; display: inline-block; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Your Booking is Confirmed!</h1>
          </div>
          <div class="content">
            <p>Dear ${data.guestName},</p>
            <p>Thank you for booking with The Glamping Spot. We're excited to have you stay with us!</p>
            
            <h2>Booking Details</h2>
            <ul>
              <li><strong>Booking Reference:</strong> ${data.bookingId}</li>
              <li><strong>Check-in:</strong> ${data.checkInDate} (after 3:00 PM)</li>
              <li><strong>Check-out:</strong> ${data.checkOutDate} (before 11:00 AM)</li>
              <li><strong>Accommodation:</strong> ${data.propertyName}</li>
              <li><strong>Guests:</strong> ${data.guestCount}</li>
              <li><strong>Total Amount:</strong> $${data.totalAmount}</li>
            </ul>
            
            <p>Need to manage your booking? You can view and modify your reservation by clicking the button below.</p>
            
            <p style="text-align: center; margin-top: 30px;">
              <a href="${data.bookingUrl}" class="button">View My Booking</a>
            </p>
            
            <p>If you have any questions before your stay, please don't hesitate to contact us.</p>
            
            <p>We look forward to welcoming you to The Glamping Spot!</p>
            
            <p>Best regards,<br>The Glamping Spot Team</p>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} The Glamping Spot. All rights reserved.</p>
            <p>123 Glamping Road, Modesto, CA 95123</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }
  
  // Additional templates for different notification types
  export function getBookingReminderTemplate(data: EmailTemplateData): string {
    // Similar structure to above
  }
  
  export function getContactFormResponseTemplate(data: EmailTemplateData): string {
    // Similar structure to above
  }