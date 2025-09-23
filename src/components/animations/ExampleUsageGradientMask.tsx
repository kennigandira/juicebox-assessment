'use client';

import { LottieWithGradientMask } from './LottieWithGradientMask';

export function ExampleUsageGradientMask() {
  return (
    <div className="p-8 bg-[#0a0b14] min-h-screen">
      <h1 className="text-2xl font-bold text-white mb-8">Lottie with Gradient Mask Test</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Default overlay blend mode */}
        <div className="border border-white/20 rounded-lg p-4">
          <h2 className="text-lg text-white mb-4">Overlay (Default)</h2>
          <div className="w-full h-64">
            <LottieWithGradientMask
              className="w-full h-full"
              blendMode="overlay"
              opacity={0.7}
            />
          </div>
        </div>

        {/* Screen blend mode */}
        <div className="border border-white/20 rounded-lg p-4">
          <h2 className="text-lg text-white mb-4">Screen</h2>
          <div className="w-full h-64">
            <LottieWithGradientMask
              className="w-full h-full"
              blendMode="screen"
              opacity={0.6}
            />
          </div>
        </div>

        {/* Multiply blend mode */}
        <div className="border border-white/20 rounded-lg p-4">
          <h2 className="text-lg text-white mb-4">Multiply</h2>
          <div className="w-full h-64">
            <LottieWithGradientMask
              className="w-full h-full"
              blendMode="multiply"
              opacity={0.8}
            />
          </div>
        </div>

        {/* Hard light blend mode */}
        <div className="border border-white/20 rounded-lg p-4">
          <h2 className="text-lg text-white mb-4">Hard Light</h2>
          <div className="w-full h-64">
            <LottieWithGradientMask
              className="w-full h-full"
              blendMode="hard-light"
              opacity={0.5}
            />
          </div>
        </div>

        {/* Color dodge blend mode */}
        <div className="border border-white/20 rounded-lg p-4">
          <h2 className="text-lg text-white mb-4">Color Dodge</h2>
          <div className="w-full h-64">
            <LottieWithGradientMask
              className="w-full h-full"
              blendMode="color-dodge"
              opacity={0.4}
            />
          </div>
        </div>

        {/* Soft light blend mode */}
        <div className="border border-white/20 rounded-lg p-4">
          <h2 className="text-lg text-white mb-4">Soft Light</h2>
          <div className="w-full h-64">
            <LottieWithGradientMask
              className="w-full h-full"
              blendMode="soft-light"
              opacity={0.8}
            />
          </div>
        </div>
      </div>
    </div>
  );
}