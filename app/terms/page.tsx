import { Metadata } from 'next';
import { LegalPageLayout } from '@/components/legal/LegalPageLayout';

export const metadata: Metadata = {
  title: 'Terms of Service | The Glamping Spot',
  description: 'Terms governing use of the theglampingspot.com website.',
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <LegalPageLayout
      title="Terms of Service"
      path="/terms"
      lastUpdated="July 3, 2026"
      intro="These terms govern your use of this website (theglampingspot.com). They are a general-purpose website terms template and have not been reviewed by an attorney — treat them as a starting point, not a substitute for legal advice."
    >
      <h2>Use of this website</h2>
      <p>
        This website provides information about The Glamping Spot, a geodesic dome rental in Kountze,
        Texas, and lets prospective and confirmed guests sign a liability waiver electronically. By using
        this site, you agree to use it only for lawful purposes and not to interfere with its normal
        operation.
      </p>

      <h2>Bookings are handled by Airbnb</h2>
      <p>
        This website does not process reservations or payments. All bookings for The Glamping Spot are
        made and paid for through Airbnb, and your booking is governed by Airbnb&apos;s own Terms of
        Service and cancellation policies, not by this document.
      </p>

      <h2>Liability waiver</h2>
      <p>
        Guests are required to review and electronically sign a separate liability waiver before or at
        check-in. The waiver, not these Terms, governs assumption of risk and release of liability for
        your stay. You can review and sign it at <code>/waiver</code>.
      </p>

      <h2>Intellectual property</h2>
      <p>
        The text, photos, and design of this website belong to The Glamping Spot unless otherwise noted,
        and may not be copied or reused without permission.
      </p>

      <h2>No warranty</h2>
      <p>
        This website is provided &quot;as is.&quot; We try to keep information (availability, amenities,
        pricing) accurate and up to date, but the Airbnb listing is the authoritative source — if
        anything here conflicts with the Airbnb listing, the Airbnb listing controls.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the extent permitted by law, The Glamping Spot is not liable for indirect or consequential
        damages arising from your use of this website. This does not affect the separate liability
        waiver you sign for your stay.
      </p>

      <h2>Third-party links</h2>
      <p>
        This site links to third-party services including Airbnb, Instagram, and Facebook. We aren&apos;t
        responsible for the content, policies, or practices of those third-party sites.
      </p>

      <h2>Governing law</h2>
      <p>These terms are governed by the laws of the State of Texas.</p>

      <h2>Changes to these terms</h2>
      <p>
        We may update these terms from time to time. The &quot;Last updated&quot; date at the top of this
        page reflects the most recent revision.
      </p>

      <h2>Contact</h2>
      <p>Questions about these terms can be sent through our Airbnb listing messaging.</p>
    </LegalPageLayout>
  );
}
