'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { waiverSchema, type WaiverFormValues } from '@/lib/waiver/schema';
import { TextField } from '@/components/ui/TextField';
import { Checkbox } from '@/components/ui/Checkbox';
import { SignaturePad } from '@/components/ui/SignaturePad';

const defaultValues: WaiverFormValues = {
  guestFullName: '',
  guestEmail: '',
  guestPhone: '',
  homeAddress: '',
  arrivalDate: '',
  departureDate: '',
  partySize: 1,
  emergencyContactName: '',
  emergencyContactPhone: '',
  minorsPresent: false,
  minorDetails: '',
  bringingOwnVehicle: false,
  vehicleDescription: '',
  agreeAssumptionOfRisk: false as unknown as true,
  agreeReleaseOfLiability: false as unknown as true,
  agreeMedicalAuthorization: false as unknown as true,
  agreePhotoRelease: false,
  signatureDataUrl: '',
};

type SubmitState =
  | { status: 'idle' }
  | { status: 'submitting' }
  | { status: 'success'; downloadUrl: string; filename: string }
  | { status: 'error'; message: string };

export function WaiverForm() {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<WaiverFormValues>({
    resolver: zodResolver(waiverSchema),
    defaultValues,
  });

  const [submitState, setSubmitState] = useState<SubmitState>({ status: 'idle' });
  const minorsPresent = watch('minorsPresent');
  const bringingOwnVehicle = watch('bringingOwnVehicle');

  const onSubmit = async (values: WaiverFormValues) => {
    setSubmitState({ status: 'submitting' });
    try {
      const res = await fetch('/api/waiver', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error ?? 'Something went wrong submitting the waiver.');
      }

      const { pdfBase64, filename } = (await res.json()) as { pdfBase64: string; filename: string };
      const byteChars = atob(pdfBase64);
      const bytes = new Uint8Array(byteChars.length);
      for (let i = 0; i < byteChars.length; i++) bytes[i] = byteChars.charCodeAt(i);
      const blob = new Blob([bytes], { type: 'application/pdf' });
      const downloadUrl = URL.createObjectURL(blob);

      setSubmitState({ status: 'success', downloadUrl, filename });
    } catch (err) {
      setSubmitState({
        status: 'error',
        message: err instanceof Error ? err.message : 'Something went wrong submitting the waiver.',
      });
    }
  };

  if (submitState.status === 'success') {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
        <h3 className="text-lg font-semibold text-emerald-900 mb-2">Waiver signed</h3>
        <p className="text-sm text-emerald-800 mb-6">
          A copy has been emailed to you and to the host. You can also download your copy now.
        </p>
        <a
          href={submitState.downloadUrl}
          download={submitState.filename}
          className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:ring-offset-2"
        >
          Download signed waiver (PDF)
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-8">
      <fieldset className="space-y-5">
        <legend className="text-lg font-semibold text-gray-900 mb-1">Your information</legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <TextField label="Full legal name" {...register('guestFullName')} error={errors.guestFullName?.message} />
          <TextField label="Email" type="email" {...register('guestEmail')} error={errors.guestEmail?.message} />
          <TextField label="Phone" type="tel" {...register('guestPhone')} error={errors.guestPhone?.message} />
          <TextField label="Home address" {...register('homeAddress')} error={errors.homeAddress?.message} />
        </div>
      </fieldset>

      <fieldset className="space-y-5">
        <legend className="text-lg font-semibold text-gray-900 mb-1">Your stay</legend>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <TextField label="Arrival date" type="date" {...register('arrivalDate')} error={errors.arrivalDate?.message} />
          <TextField label="Departure date" type="date" {...register('departureDate')} error={errors.departureDate?.message} />
          <TextField label="Party size" type="number" min={1} max={5} {...register('partySize')} error={errors.partySize?.message} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <TextField label="Emergency contact name" {...register('emergencyContactName')} error={errors.emergencyContactName?.message} />
          <TextField label="Emergency contact phone" type="tel" {...register('emergencyContactPhone')} error={errors.emergencyContactPhone?.message} />
        </div>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="text-lg font-semibold text-gray-900 mb-1">A few details that affect the waiver</legend>
        <Checkbox label="A minor (under 18) is part of my party" {...register('minorsPresent')} />
        {minorsPresent && (
          <TextField
            as="textarea"
            label="Name and age of each minor"
            {...register('minorDetails')}
            error={errors.minorDetails?.message}
          />
        )}

        <Checkbox
          label="I am bringing my own ATV, dirt bike, or other motorized recreational vehicle"
          {...register('bringingOwnVehicle')}
        />
        {bringingOwnVehicle && (
          <TextField
            as="textarea"
            label="Describe the vehicle(s)"
            {...register('vehicleDescription')}
            error={errors.vehicleDescription?.message}
          />
        )}
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="text-lg font-semibold text-gray-900 mb-1">Agreement</legend>
        <Checkbox
          label="I have read and agree to Section 1: Assumption of Risk"
          {...register('agreeAssumptionOfRisk')}
          error={errors.agreeAssumptionOfRisk?.message}
        />
        <Checkbox
          label="I have read and agree to Sections 2–5: Release of Liability, Indemnification, Medical Treatment Authorization, and Minors"
          {...register('agreeReleaseOfLiability')}
          error={errors.agreeReleaseOfLiability?.message}
        />
        <Checkbox
          label="I authorize emergency medical treatment as described in Section 4 if needed"
          {...register('agreeMedicalAuthorization')}
          error={errors.agreeMedicalAuthorization?.message}
        />
        <Checkbox
          label="(Optional) I grant the photo/media release described in Section 6"
          {...register('agreePhotoRelease')}
        />
      </fieldset>

      <fieldset>
        <legend className="text-lg font-semibold text-gray-900 mb-3">Sign to complete</legend>
        <Controller
          name="signatureDataUrl"
          control={control}
          render={({ field }) => (
            <SignaturePad
              onChange={(dataUrl) => field.onChange(dataUrl ?? '')}
              error={errors.signatureDataUrl?.message}
            />
          )}
        />
      </fieldset>

      {submitState.status === 'error' && (
        <p className="text-sm text-red-600" role="alert">
          {submitState.message}
        </p>
      )}

      <button
        type="submit"
        disabled={submitState.status === 'submitting'}
        className="w-full py-3.5 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-md transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:ring-offset-2"
      >
        {submitState.status === 'submitting' ? 'Submitting…' : 'Sign & submit waiver'}
      </button>
    </form>
  );
}
