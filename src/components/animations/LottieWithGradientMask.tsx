'use client';

import { useEffect, useState } from 'react';
import { useLottie } from 'lottie-react';
import styles from './Lottie.module.css';

interface LottieWithGradientMaskProps {
  animationData?: Record<string, unknown>;
  animationPath?: string;
  className?: string;
  loop?: boolean;
  autoplay?: boolean;
  speed?: number;
  gradientImageUrl?: string;
  blendMode?:
    | 'multiply'
    | 'screen'
    | 'overlay'
    | 'darken'
    | 'lighten'
    | 'hard-light'
    | 'soft-light'
    | 'color-dodge'
    | 'color-burn';
  opacity?: number;
  onComplete?: () => void;
  onLoopComplete?: () => void;
}

export function LottieWithGradientMask({
  animationData,
  animationPath = '/animations/JB2G_Lottie.json',
  className = '',
  loop = true,
  autoplay = true,
  speed = 1,
  gradientImageUrl: _gradientImageUrl = '/cube-colors.png',
  blendMode: _blendMode = 'overlay',
  opacity: _opacity = 0.7,
  onComplete,
  onLoopComplete,
}: LottieWithGradientMaskProps) {
  const [animation, setAnimation] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const lottieOptions = {
    animationData: animation,
    loop,
    autoplay,
    onComplete,
    onLoopComplete,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
      progressiveLoad: true,
      hideOnTransparent: true,
    },
  };

  const { View, setSpeed } = useLottie(lottieOptions, { background: 'transparent' });

  useEffect(() => {
    if (animationData) {
      setAnimation(animationData);
      setLoading(false);
      return;
    }

    if (animationPath) {
      fetch(animationPath)
        .then(response => {
          if (!response.ok) {
            throw new Error(`Failed to load animation: ${response.statusText}`);
          }
          return response.json();
        })
        .then(data => {
          setAnimation(data);
          setLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [animationData, animationPath]);

  useEffect(() => {
    if (setSpeed && speed !== 1) {
      setSpeed(speed);
    }
  }, [setSpeed, speed]);

  if (loading) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <div className="animate-pulse bg-gray-200 rounded-lg w-full h-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className={`flex items-center justify-center text-red-500 ${className}`}>
        <p>Failed to load animation: {error}</p>
      </div>
    );
  }

  if (!animation) {
    return (
      <div className={`flex items-center justify-center text-gray-500 ${className}`}>
        <p>No animation data available</p>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {/* Lottie Animation */}
      <div className={styles.lottie}>{View}</div>

      {/* <div className={styles.layerMask}></div> */}

      {/* Gradient Overlay */}
      {/* <img
        src={gradientImageUrl}
        alt=""
        className={styles.gradientOverlay}
        style={{
          mixBlendMode: blendMode,
          opacity: opacity,
        }}
      /> */}
    </div>
  );
}
