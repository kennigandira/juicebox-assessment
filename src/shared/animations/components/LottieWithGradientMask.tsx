'use client';

import { useEffect, useRef, useState } from 'react';
import { useLottie } from 'lottie-react';
import styles from './Lottie.module.css';
import { parseAsStringEnum, useQueryState } from 'nuqs';
import { QueryState } from '@/global/enums/queryState';
import { PageState } from '@/global/enums/pageState';

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
  /** Alternative text for screen readers when animation fails to load */
  alt?: string;
  // /** Whether to respect user's reduced motion preference */
  // respectsReducedMotion?: boolean;
  /** Callback when animation fails to load */
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
  const [error, setError] = useState<string | null>(null);

  const [pageState] = useQueryState(
    QueryState.PageState,
    parseAsStringEnum<PageState>(Object.values(PageState)).withDefault(PageState.Hero)
  );

  const lottieOptions = {
    animationData: animation,
    loop: loop,
    autoplay: autoplay,
    onComplete: () => {
      // Announce to screen readers when ready
      if (containerRef.current) {
        containerRef.current.setAttribute('aria-label', `${alt} - Animation completed`);
      }
      onComplete?.();
    },
    onLoopComplete,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
      progressiveLoad: true,
      hideOnTransparent: true,
    },
  };

  const { View, setSpeed } = useLottie(lottieOptions, { background: 'transparent' });

  // Load animation data with proper error handling
  useEffect(() => {
    const loadAnimation = async () => {
      try {
        setLoading(true);
        let data;

        if (animationData) {
          data = animationData;
        } else {
          // Dynamic import for better error handling
          const response = await fetch(animationPath);
          if (!response.ok) {
            throw new Error(`Failed to load animation: ${response.status}`);
          }
          data = await response.json();
        }

        // Validate animation data structure
        if (!data || !data.v || !data.layers) {
          throw new Error('Invalid animation data structure');
        }

        setAnimation(data);
      } catch (err) {
        console.warn('Lottie animation failed to load:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
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

  // Loading state
  if (loading) {
    return (
      <div
        ref={containerRef}
        className={`${className} ${styles['lottie-loading']} flex items-center justify-center min-h-[200px]`}
        role="img"
        aria-label="Loading animation..."
      >
        <div className="animate-pulse bg-gradient-to-r from-purple-400 to-blue-500 rounded-lg w-full h-48 opacity-20" />
        <span className="sr-only">Animation is loading, please wait...</span>
      </div>
    );
  }

  // Error state with accessible fallback
  if (error || !animation) {
    return (
      <div
        ref={containerRef}
        className={`${className} ${styles['lottie-error']} flex flex-col items-center justify-center min-h-[200px] text-center p-6`}
        role="img"
        aria-label={alt}
      >
        <div className="bg-gradient-to-r from-purple-400 to-blue-500 rounded-lg p-8 text-white">
          <svg
            className="w-16 h-16 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
          <h3 className="text-lg font-semibold mb-2">Interactive Experience</h3>
          <p className="text-sm opacity-90">
            Discover how Juicebox transforms your data into actionable insights
          </p>
        </div>
        <span className="sr-only">{alt}</span>
      </div>
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
