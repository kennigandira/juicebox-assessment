import React from 'react';

const LottieWithNoiseMask = ({
  loop: _loop = true,
  autoplay: _autoplay = true,
  style: _style = {},
  noiseOpacity: _noiseOpacity = 0.5,
  noiseFrequency: _noiseFrequency = 0.65,
  noiseOctaves: _noiseOctaves = 3,
  blendMode: _blendMode = 'screen',
  ..._lottieProps
}) => {
  // Style objects available but not currently used in this implementation
  // const containerStyle = {
  //   position: 'relative',
  //   display: 'inline-block',
  //   ...style,
  // };
  //
  // const lottieStyle = {
  //   width: '100%',
  //   height: '100%',
  // };

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
