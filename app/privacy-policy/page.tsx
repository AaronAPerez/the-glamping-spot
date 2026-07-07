import { Metadata } from 'next';
import { LegalPageLayout } from '@/components/legal/LegalPageLayout';

export const metadata: Metadata = {
  title: 'Privacy Policy | The Glamping Spot',
  description: 'How The Glamping Spot collects, uses, and protects information submitted through this website.',
  robots: { index: true, follow: true },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout
      title="Privacy Policy"
      path="/privacy-policy"
      lastUpdated="July 3, 2026"
      intro="This policy explains what information this website (theglampingspot.net) collects and how it's used. It does not cover Airbnb's own site or app, which has its own privacy policy."
    >
      <h2>Information we collect</h2>
      <h3>Liability waiver form</h3>
      <p>
        If you sign the liability waiver at <code>/waiver</code>, we collect your name, email, phone
        number, home address, stay dates, party size, emergency contact, and your electronic signature.
        This information is submitted directly to the property host by email and is not stored in a
        database on this website. We also record the submission time and IP address as part of the
        signed record.
      </p>
      <h3>Automatically collected information</h3>
      <p>
        Like most websites, our hosting provider logs standard technical information (IP address,
        browser type, pages visited) for security and performance purposes. If analytics is enabled, we
        may also use Google Analytics, which uses cookies to understand aggregate site usage. We do not
        use advertising or cross-site tracking cookies.
      </p>

      <h2>How we use information</h2>
      <ul>
        <li>To process and confirm a signed liability waiver ahead of your stay</li>
        <li>To respond if you reach out to us</li>
        <li>To understand how visitors use the site, so we can improve it</li>
      </ul>

      <h2>Bookings and payment</h2>
      <p>
        All bookings and payments for stays at The Glamping Spot are handled entirely through Airbnb.
        This website never collects or stores payment card information, and booking-related data you
        give Airbnb is governed by Airbnb&apos;s own privacy policy, not this one.
      </p>

      <h2>Sharing of information</h2>
      <p>
        We do not sell your information. Waiver submissions are sent via email through our email service
        provider (Google/Gmail) to deliver a copy to the host and to you. We do not share your
        information with any other third party except as required by law.
      </p>

      <h2>Data retention</h2>
      <p>
        Signed waiver copies exist as email records in the host&apos;s inbox; this site does not keep a
        separate database of submissions. To request that a copy be deleted, contact us using the
        details below.
      </p>

      <h2>Your choices</h2>
      <p>
        You can ask us what information we have about you, or ask us to delete it, by messaging us
        through Airbnb or reaching out using the contact details on this site.
      </p>

      <h2>Children&apos;s privacy</h2>
      <p>
        This website is not directed at children, and we do not knowingly collect information from
        children under 13. If a minor is part of your travel party, their name and age may be included
        in a waiver submitted by their parent or guardian.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        We may update this policy from time to time. The &quot;Last updated&quot; date at the top of this
        page reflects the most recent revision.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy can be sent through our Airbnb listing messaging, which is the
        fastest way to reach us.
      </p>
    </LegalPageLayout>
  );
}
