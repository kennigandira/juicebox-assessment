'use client';

import { Suspense } from 'react';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

function SmoothScrollClient() {
  useSmoothScroll();
  return null;
}

export function SmoothScrollProvider() {
  return (
    <Suspense fallback={null}>
      <SmoothScrollClient />
    </Suspense>
  );
}
