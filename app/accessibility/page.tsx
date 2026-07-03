import { Metadata } from 'next';
import { LegalPageLayout } from '@/components/legal/LegalPageLayout';

export const metadata: Metadata = {
  title: 'Accessibility Statement | The Glamping Spot',
  description: 'Our commitment to an accessible website, and how to report an accessibility issue.',
  robots: { index: true, follow: true },
};

export default function AccessibilityPage() {
  return (
    <LegalPageLayout
      title="Accessibility Statement"
      path="/accessibility"
      lastUpdated="July 3, 2026"
      intro="We want theglampingspot.com to be usable by everyone, including people using screen readers, keyboard navigation, or other assistive technology."
    >
      <h2>Our approach</h2>
      <p>
        This site is built with accessibility in mind: semantic HTML landmarks, a &quot;skip to main
        content&quot; link on every page, visible focus outlines on interactive elements, descriptive
        alt text on images, and ARIA labels on icon-only buttons and links. We aim to meet the WCAG 2.1
        Level AA guidelines, though we haven&apos;t completed a formal third-party audit, so we describe
        this as an ongoing goal rather than a certified conformance claim.
      </p>

      <h2>Known limitations</h2>
      <p>
        Some embedded third-party content — for example, the Airbnb booking widget you&apos;re linked to
        for reservations, or embedded social media content — is outside our control and may not meet the
        same standard as the rest of this site.
      </p>

      <h2>Reporting an issue</h2>
      <p>
        If you run into an accessibility barrier anywhere on this site, please let us know through our
        Airbnb listing messaging so we can look into it. Include the page you were on and a description
        of the issue if you can.
      </p>
    </LegalPageLayout>
  );
}
