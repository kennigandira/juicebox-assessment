'use client';

import { useEffect, useRef, useState } from 'react';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import styles from './Lottie.module.css';

interface LottieAnimationProps {
  animationData?: Record<string, unknown>;
  animationPath?: string;
  className?: string;
  loop?: boolean;
  autoplay?: boolean;
  speed?: number;
  colorTheme?: 'default' | 'purple' | 'blue' | 'gradient';
  enhanceColors?: boolean;
  lightEffect?: 'none' | 'soft' | 'neon' | 'pulse' | 'aurora' | 'spotlight';
  glowIntensity?: 'low' | 'medium' | 'high';
  lightColor?: string;
  pulseSpeed?: number;
  enableHoverGlow?: boolean;
  onComplete?: () => void;
  onLoopComplete?: () => void;
}

export function LottieAnimation({
  animationData,
  animationPath = '/animations/JB2G_Lottie.json',
  className = '',
  loop = true,
  autoplay = true,
  speed = 1,
  colorTheme = 'default',
  enhanceColors = false,
  lightEffect = 'none',
  glowIntensity = 'medium',
  lightColor,
  pulseSpeed = 2,
  enableHoverGlow = false,
  onComplete,
  onLoopComplete,
}: LottieAnimationProps) {
  const [animation, setAnimation] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const lottieRef = useRef<LottieRefCurrentProps>(null);

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

  const getColorThemeStyles = () => {
    switch (colorTheme) {
      case 'purple':
        return 'filter hue-rotate-[280deg] saturate-150 brightness-110';
      case 'blue':
        return 'filter hue-rotate-[200deg] saturate-125 brightness-105';
      case 'gradient':
        return 'filter hue-rotate-[260deg] saturate-140 brightness-115 contrast-110';
      default:
        return '';
    }
  };

  const getLightEffectStyles = () => {
    switch (lightEffect) {
      case 'soft':
        return glowIntensity === 'low'
          ? 'soft-glow opacity-70'
          : glowIntensity === 'high'
            ? 'intense-glow'
            : 'soft-glow';
      case 'neon':
        return `neon-flicker ${glowIntensity === 'high' ? 'brightness-125' : ''}`;
      case 'pulse':
        return `light-pulse ${glowIntensity === 'high' ? 'brightness-110' : ''}`;
      case 'aurora':
        return `aurora-glow ${glowIntensity === 'high' ? 'saturate-150' : ''}`;
      case 'spotlight':
        return glowIntensity === 'high' ? 'spotlight-shimmer' : 'spotlight-effect';
      default:
        return '';
    }
  };

  const getAnimationClasses = () => {
    const classes = [];

    if (enableHoverGlow) {
      classes.push('hover:brightness-125 hover:saturate-150 transition-all duration-300');
    }

    return classes.join(' ');
  };

  const enhancementStyles = enhanceColors ? 'drop-shadow-lg brightness-110 saturate-125' : '';

  const colorStyles = getColorThemeStyles();
  const lightStyles = getLightEffectStyles();
  const animationClasses = getAnimationClasses();

  console.debug('====CEK SINI BOS', lightEffect);

  return (
    <div className={` transition-all duration-500`}>
      <div className={`${lightStyles} relative`}>
        <Lottie
          lottieRef={lottieRef}
          animationData={animation}
          className={`${className} relative z-0`}
          // loop={loop}
          // autoplay={autoplay}
          onComplete={onComplete}
          onLoopComplete={onLoopComplete}
          rendererSettings={{
            preserveAspectRatio: 'xMidYMid slice',
            progressiveLoad: true,
            hideOnTransparent: true,
          }}
        />

        <img src="./cube-colors.png" alt="" className={styles.layerMask} />
      </div>
    </div>
  );
}
