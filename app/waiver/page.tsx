import { Metadata } from 'next';
import { WaiverDocument } from '@/components/waiver/WaiverDocument';
import { WaiverForm } from '@/components/waiver/WaiverForm';

export const metadata: Metadata = {
  title: 'Sign Liability Waiver | The Glamping Spot',
  description: 'Electronically sign the liability waiver required before your stay at The Glamping Spot.',
  robots: { index: false, follow: false },
};

export default function WaiverPage() {
  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Liability Waiver</h1>
          <p className="text-gray-600">
            Please read the waiver below and complete the form to sign electronically before your stay.
            You&apos;ll be able to download your signed copy immediately, and we&apos;ll email a copy to you as well.
          </p>
        </header>

        <div className="rounded-2xl border border-gray-200 p-6 sm:p-8 mb-10 max-h-[28rem] overflow-y-auto bg-gray-50">
          <WaiverDocument />
        </div>

        <WaiverForm />
      </main>
    </div>
  );
}
