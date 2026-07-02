import { z } from 'zod';

/**
 * Single source of truth for waiver form data — used by both the client
 * form (react-hook-form + zodResolver) and the API route (server-side
 * re-validation before anything is emailed).
 */
export const waiverSchema = z
  .object({
    guestFullName: z.string().trim().min(2, 'Enter your full legal name'),
    guestEmail: z.string().trim().email('Enter a valid email address'),
    guestPhone: z.string().trim().min(7, 'Enter a valid phone number'),
    homeAddress: z.string().trim().min(5, 'Enter your home address'),

    arrivalDate: z.string().min(1, 'Select your arrival date'),
    departureDate: z.string().min(1, 'Select your departure date'),
    partySize: z.coerce
      .number({ message: 'Enter number of guests' })
      .int()
      .min(1, 'At least 1 guest')
      .max(5, 'The dome sleeps a maximum of 5 guests'),

    emergencyContactName: z.string().trim().min(2, 'Enter an emergency contact name'),
    emergencyContactPhone: z.string().trim().min(7, 'Enter an emergency contact phone number'),

    minorsPresent: z.boolean(),
    minorDetails: z.string().trim().optional(),

    bringingOwnVehicle: z.boolean(),
    vehicleDescription: z.string().trim().optional(),

    agreeAssumptionOfRisk: z.literal(true, {
      message: 'You must acknowledge the assumption of risk to continue',
    }),
    agreeReleaseOfLiability: z.literal(true, {
      message: 'You must agree to the release of liability to continue',
    }),
    agreeMedicalAuthorization: z.literal(true, {
      message: 'You must agree to the medical treatment authorization to continue',
    }),
    agreePhotoRelease: z.boolean(),

    signatureDataUrl: z
      .string()
      .min(100, 'Please sign the waiver using the signature pad before submitting'),
  })
  .refine((data) => !data.minorsPresent || !!data.minorDetails?.trim(), {
    message: 'List the name and age of each minor in your party',
    path: ['minorDetails'],
  })
  .refine((data) => !data.bringingOwnVehicle || !!data.vehicleDescription?.trim(), {
    message: 'Describe the vehicle(s) you are bringing (e.g. ATV, dirt bike)',
    path: ['vehicleDescription'],
  })
  .refine((data) => new Date(data.departureDate) > new Date(data.arrivalDate), {
    message: 'Departure date must be after the arrival date',
    path: ['departureDate'],
  });

export type WaiverFormValues = z.infer<typeof waiverSchema>;

/** Server-side record — adds fields the server itself stamps, never the client. */
export type SignedWaiverRecord = WaiverFormValues & {
  signedAt: string;
  ipAddress: string | null;
};
