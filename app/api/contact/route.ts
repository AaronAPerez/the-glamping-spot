import { NextRequest, NextResponse } from 'next/server';
import { httpsCallable } from 'firebase/functions';


export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, message, subject } = await request.json();
    
    // Validate form data
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }
    
    // Call the Cloud Function to send notifications
    const sendContactNotification = httpsCallable(functions, 'onContactFormSubmission');
    await sendContactNotification({
      name,
      email,
      phone: phone || '',
      message,
      subject: subject || 'General Inquiry'
    });
    
    return NextResponse.json(
      { success: true, message: 'Your message has been sent successfully!' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error processing contact form:', error);
    
    return NextResponse.json(
      { error: error.message || 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
}