import { NextRequest, NextResponse } from 'next/server';
import { waiverSchema, type SignedWaiverRecord } from '@/lib/waiver/schema';
import { renderWaiverPdf } from '@/lib/waiver/pdf';
import { sendEmail } from '@/lib/email';
import { WAIVER_BUSINESS_NAME } from '@/lib/waiver/content';

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = waiverSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid waiver submission', issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const record: SignedWaiverRecord = {
    ...parsed.data,
    signedAt: new Date().toISOString(),
    ipAddress: req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? null,
  };

  const pdfBuffer = await renderWaiverPdf(record);
  const filename = `glamping-spot-waiver-${record.guestFullName.replace(/\s+/g, '-').toLowerCase()}.pdf`;

  const recipients = (process.env.WAIVER_RECIPIENT_EMAILS ?? '')
    .split(',')
    .map((e) => e.trim())
    .filter(Boolean);

  const emailHtml = `
    <p>A new liability waiver was signed for ${WAIVER_BUSINESS_NAME}.</p>
    <ul>
      <li><strong>Guest:</strong> ${record.guestFullName}</li>
      <li><strong>Email:</strong> ${record.guestEmail}</li>
      <li><strong>Phone:</strong> ${record.guestPhone}</li>
      <li><strong>Stay dates:</strong> ${record.arrivalDate} to ${record.departureDate}</li>
      <li><strong>Party size:</strong> ${record.partySize}</li>
      <li><strong>Signed at:</strong> ${record.signedAt}</li>
    </ul>
    <p>The signed waiver is attached as a PDF.</p>
  `;

  // Email delivery is best-effort: if it fails (e.g. SMTP not yet configured),
  // the guest should still get their signed PDF back rather than lose their
  // submission entirely. Failures are logged server-side for follow-up.
  const attachments = [{ filename, content: pdfBuffer, contentType: 'application/pdf' }];
  let emailError: string | null = null;

  try {
    if (recipients.length > 0) {
      await sendEmail({
        to: recipients,
        subject: `Signed waiver: ${record.guestFullName} (${record.arrivalDate})`,
        html: emailHtml,
        attachments,
      });
    }
    await sendEmail({
      to: record.guestEmail,
      subject: `Your signed waiver — ${WAIVER_BUSINESS_NAME}`,
      html: `<p>Thanks for signing the liability waiver for your upcoming stay at ${WAIVER_BUSINESS_NAME}. Your signed copy is attached.</p>`,
      attachments,
    });
  } catch (err) {
    emailError = err instanceof Error ? err.message : 'Unknown email error';
    console.error('Failed to send waiver email:', emailError);
  }

  return NextResponse.json({
    pdfBase64: pdfBuffer.toString('base64'),
    filename,
    emailDelivered: emailError === null,
  });
}
