'use client';

import { LottieWithGradientMask } from '@/shared/animations';

export default function TestGradientPage() {
  return (
    <div className="min-h-screen bg-[#0a0b14] flex items-center justify-center">
      <LottieWithGradientMask
        className="w-96 h-96"
        alt="Test Lottie animation with gradient mask"
      />
    </div>
  );
}
