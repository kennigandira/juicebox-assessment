import React from 'react';

const NOISE_FILTER_ID = 'lottie-noise-mask';

const NoiseMaskFilter = ({
  opacity = 0.5,
  baseFrequency = 0.65,
  numOctaves = 3,
  blendMode = 'screen',
}) => {
  return (
    <svg width="300" height="400" style={{ position: 'absolute', pointerEvents: 'none' }}>
      <defs>
        <filter id={NOISE_FILTER_ID} x="0" y="0" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency={baseFrequency}
            numOctaves={numOctaves}
            stitchTiles="stitch"
          />
          <feBlend mode={blendMode} />
        </filter>

        <mask id={`${NOISE_FILTER_ID}-mask`}>
          <rect
            width="100%"
            height="100%"
            fill="white"
            filter={`url(#${NOISE_FILTER_ID})`}
            opacity={opacity}
          />
        </mask>
      </defs>
    </svg>
  );
};

export default NoiseMaskFilter;
export { NOISE_FILTER_ID };
