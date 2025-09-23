import React from 'react';
import Lottie from 'lottie-react';
import NoiseMaskFilter, { NOISE_FILTER_ID } from './NoiseMaskFilter';
import { LottieAnimation } from './LottieAnimation';
import { LottieWithGradientMask } from './LottieWithGradientMask';

const LottieWithNoiseMask = ({
  loop = true,
  autoplay = true,
  style = {},
  noiseOpacity = 0.5,
  noiseFrequency = 0.65,
  noiseOctaves = 3,
  blendMode = 'screen',
  ...lottieProps
}) => {
  const containerStyle = {
    position: 'relative',
    display: 'inline-block',
    ...style,
  };

  const lottieStyle = {
    mask: `url(#${NOISE_FILTER_ID}-mask)`,
    WebkitMask: `url(#${NOISE_FILTER_ID}-mask)`,
    width: '100%',
    height: '100%',
  };

  return (
    <div>
      {/* <NoiseMaskFilter
        opacity={noiseOpacity}
        baseFrequency={noiseFrequency}
        numOctaves={noiseOctaves}
        blendMode={blendMode}
      /> */}
    </div>
  );
};

export default LottieWithNoiseMask;
