'use client';

import { useEffect, useRef, useState } from 'react';
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
  alt?: string;
  onError?: () => void;
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
  alt = 'Interactive animation showcasing Juicebox functionality',
  // respectsReducedMotion = true,
  onError,
}: LottieWithGradientMaskProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [animation, setAnimation] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(true);

  const lottieOptions = {
    animationData: animation,
    loop: loop,
    autoplay: autoplay,
    onComplete: () => {
      if (containerRef.current) {
        containerRef.current.setAttribute('aria-label', `${alt} - Animation completed`);
      }
      onComplete?.();
    },
    onLoopComplete,
  };

  const { View, setSpeed } = useLottie(lottieOptions, { background: 'transparent' });

  // Load animation data with proper error handling
  useEffect(() => {
    const loadAnimation = async () => {
      try {
        setLoading(true);
        // Dynamic import for better error handling
        const response = await fetch(animationPath);
        if (!response.ok) {
          throw new Error(`Failed to load animation: ${response.status}`);
        }
        const data = await response.json();

        // Validate animation data structure
        if (!data || !data.v || !data.layers) {
          throw new Error('Invalid animation data structure');
        }

        setAnimation(data);
      } catch (err) {
        console.warn('Lottie animation failed to load:', err);
        onError?.();
      } finally {
        setLoading(false);
      }
    };

    loadAnimation();
  }, [animationData, animationPath, onError]);

  useEffect(() => {
    if (setSpeed && speed !== 1) {
      setSpeed(speed);
    }
  }, [setSpeed, speed]);

  if (loading) {
    return (
      <div
        ref={containerRef}
        className={`${className} ${styles['lottie-loading']}`}
        role="img"
        aria-label="Loading animation..."
      ></div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`${styles.lottieContainer} ${className}`}
      role="img"
      aria-label={alt}
      style={
        {
          // CSS custom properties for the missing styles
          '--lottie-width': '100%',
          '--lottie-height': '100%',
        } as React.CSSProperties
      }
    >
      <div className={styles.lottie}>{View}</div>
    </div>
  );
}
