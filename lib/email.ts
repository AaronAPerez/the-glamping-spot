import nodemailer from 'nodemailer';

let transporter: nodemailer.Transporter | null = null;

function getTransporter(): nodemailer.Transporter {
  if (transporter) return transporter;

  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;

  if (!user || !pass) {
    throw new Error(
      'Email is not configured: set GMAIL_USER and GMAIL_APP_PASSWORD in .env.local'
    );
  }

  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass },
  });

  return transporter;
}

export interface SendEmailAttachment {
  filename: string;
  content: Buffer;
  contentType: string;
}

export interface SendEmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  attachments?: SendEmailAttachment[];
}

export async function sendEmail({ to, subject, html, attachments }: SendEmailOptions) {
  const client = getTransporter();
  await client.sendMail({
    from: `"The Glamping Spot" <${process.env.GMAIL_USER}>`,
    to,
    subject,
    html,
    attachments,
  });
}
