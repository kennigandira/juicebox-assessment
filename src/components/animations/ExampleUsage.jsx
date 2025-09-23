import React from 'react';
import LottieWithNoiseMask from './LottieWithNoiseMask';

const ExampleUsage = () => {
  const sampleAnimationData = {
    // Your Lottie JSON data here
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Lottie with Noise Mask Examples</h2>

      <div style={{ marginBottom: '30px' }}>
        <h3>Default Noise Mask (matches your SVG)</h3>
        <LottieWithNoiseMask
          animationData={sampleAnimationData}
          style={{ width: '300px', height: '300px' }}
        />
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h3>Fine Grain Noise</h3>
        <LottieWithNoiseMask
          animationData={sampleAnimationData}
          style={{ width: '300px', height: '300px' }}
          noiseOpacity={0.7}
          noiseFrequency={1.2}
          noiseOctaves={2}
        />
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h3>Coarse Noise with Multiply Blend</h3>
        <LottieWithNoiseMask
          animationData={sampleAnimationData}
          style={{ width: '300px', height: '300px' }}
          noiseOpacity={0.3}
          noiseFrequency={0.3}
          noiseOctaves={5}
          blendMode="multiply"
        />
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h3>Heavy Texture</h3>
        <LottieWithNoiseMask
          animationData={sampleAnimationData}
          style={{ width: '300px', height: '300px' }}
          noiseOpacity={0.8}
          noiseFrequency={0.9}
          noiseOctaves={4}
          blendMode="overlay"
        />
      </div>
    </div>
  );
};

export default ExampleUsage;