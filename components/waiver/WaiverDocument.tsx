import { waiverSections, WAIVER_BUSINESS_NAME, WAIVER_PROPERTY_LOCATION } from '@/lib/waiver/content';

/**
 * Read-only rendering of the waiver legal text. Pulls from the same content
 * source used to generate the PDF, so the page and the PDF never drift.
 */
export function WaiverDocument() {
  return (
    <div className="prose prose-sm max-w-none">
      <p className="text-sm text-gray-500">
        {WAIVER_BUSINESS_NAME} — {WAIVER_PROPERTY_LOCATION}
      </p>
      {waiverSections.map((section) => (
        <section key={section.heading} className="mb-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-1.5">{section.heading}</h3>
          {section.body.map((paragraph, i) => (
            <p key={i} className="text-sm text-gray-600 leading-relaxed mb-2">
              {paragraph}
            </p>
          ))}
        </section>
      ))}
    </div>
  );
}
