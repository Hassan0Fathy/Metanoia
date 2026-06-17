'use client';

import { Suspense } from 'react';
import { ReservationFormContent } from './ReservationFormContent';

export function ReservationForm() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-ivory flex items-center justify-center">Loading...</div>}>
      <ReservationFormContent />
    </Suspense>
  );
}
