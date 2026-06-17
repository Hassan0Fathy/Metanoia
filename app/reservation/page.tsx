'use client';

import { Suspense } from 'react';
import { ReservationForm } from '@/components/common/ReservationForm';

export default function ReservationPage() {
  return (
    <div className="pt-20">
      <Suspense fallback={<div>Loading...</div>}>
        <ReservationForm />
      </Suspense>
    </div>
  );
}
