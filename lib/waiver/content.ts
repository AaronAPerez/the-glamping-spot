/**
 * Waiver legal text — the single content source rendered both on the
 * /waiver page (for guests to read before signing) and inside the
 * generated PDF (lib/waiver/pdf.tsx).
 *
 * TEMPLATE ONLY: this is placeholder liability-release language, not legal
 * advice. Have an attorney licensed in Texas review and approve this text
 * before relying on it for real bookings.
 */

export const WAIVER_BUSINESS_NAME = 'The Glamping Spot';
export const WAIVER_PROPERTY_LOCATION = 'Kountze, Texas, United States';

export interface WaiverSection {
  heading: string;
  body: string[];
}

export const waiverSections: WaiverSection[] = [
  {
    heading: '1. Assumption of Risk',
    body: [
      `Guest acknowledges that a stay at ${WAIVER_BUSINESS_NAME} in ${WAIVER_PROPERTY_LOCATION} involves inherent risks of outdoor and rural recreation, including but not limited to: uneven or wooded terrain and trails, exposure to wildlife and insects, proximity to a pond or other water features, use of fire pits or open flame, changing weather conditions, and the remote, limited-connectivity location of the property.`,
      'If Guest or any member of Guest’s party operates an ATV, off-road vehicle, dirt bike, or any other motorized recreational vehicle during the stay — whether provided at the property or brought by Guest — Guest additionally acknowledges the heightened risk of serious injury or death associated with such vehicles, and assumes full responsibility for safe and lawful operation, including use of appropriate safety gear and compliance with the minimum age and licensing requirements of any operator.',
      'Guest voluntarily assumes full responsibility for any risks of injury, illness, death, or property damage arising from these and other hazards, known or unknown, whether arising from the negligence of Host or otherwise.',
    ],
  },
  {
    heading: '2. Release and Waiver of Liability',
    body: [
      `In consideration of being permitted to stay at ${WAIVER_BUSINESS_NAME}, Guest, on behalf of themselves and all members of their party (including any minors, per Section 5), releases, waives, and discharges the property owner/host and their agents from any and all liability, claims, demands, or causes of action arising out of or related to any loss, damage, or injury that may be sustained during the stay, except to the extent caused by gross negligence or willful misconduct.`,
    ],
  },
  {
    heading: '3. Indemnification',
    body: [
      'Guest agrees to indemnify and hold harmless the property owner/host from any loss, liability, damage, or cost arising out of injury to persons or damage to property caused by the acts or omissions of Guest or any member of Guest’s party during the stay.',
    ],
  },
  {
    heading: '4. Medical Treatment Authorization',
    body: [
      'In the event of an injury or medical emergency during the stay, Guest authorizes the property owner/host to contact emergency medical services on Guest’s behalf and to take reasonable action to secure medical treatment for any injured party, at that party’s own expense, if Guest or the injured party is unable to consent at the time.',
    ],
  },
  {
    heading: '5. Minors',
    body: [
      'If any member of Guest’s party is under 18 years of age, the adult Guest signing this waiver represents that they are the parent or legal guardian of each such minor, or are otherwise authorized to sign on the minor’s behalf, and agrees to this waiver individually and on each minor’s behalf.',
    ],
  },
  {
    heading: '6. Photo & Media Release (Optional)',
    body: [
      `If Guest checks the optional photo release below, Guest grants ${WAIVER_BUSINESS_NAME} permission to use photos or videos that may include Guest, taken during the stay with Guest’s knowledge, for marketing purposes such as the website or social media. This section is optional and declining it will not affect Guest’s stay.`,
    ],
  },
  {
    heading: '7. Governing Law',
    body: [
      'This agreement is governed by the laws of the State of Texas. If any provision of this waiver is found unenforceable, the remaining provisions remain in full force and effect.',
    ],
  },
  {
    heading: '8. Acknowledgment',
    body: [
      'By signing below, Guest acknowledges that they have read and understood this waiver in its entirety, are signing it voluntarily, and intend it to be a full and complete release of liability to the maximum extent permitted by law.',
    ],
  },
];
