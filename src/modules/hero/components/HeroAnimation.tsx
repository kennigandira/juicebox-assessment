'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { LottieWithGradientMask } from '@/shared/animations';
import styles from '../styles/Hero.module.css';

// Register ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface HeroAnimationProps {
  isInWalkthroughMode?: boolean;
}

export function HeroAnimation({ isInWalkthroughMode = false }: HeroAnimationProps) {
  const animationRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check for reduced motion preference
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);

      const handleChange = (e: MediaQueryListEvent) => {
        setPrefersReducedMotion(e.matches);
      };

      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, []);

  // Scroll-triggered animations when entering walkthrough mode
  useEffect(() => {
    if (!animationRef.current || !containerRef.current || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (isInWalkthroughMode) {
        // Create scroll-triggered animation for walkthrough mode
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: 'top center',
          end: '+=100vh',
          scrub: 0.5,
          pin: false,
          anticipatePin: 1,
          onUpdate: self => {
            const progress = self.progress;
            const element = animationRef.current;

            if (!element) return;

            // Calculate scale (from 100% to 50%)
            const scale = 1 - progress * 0.5;
            // Calculate opacity (fade slightly)
            const opacity = Math.max(0.3, 1 - progress * 0.7);

            // Apply transforms with proper performance optimization
            gsap.set(element, {
              position: 'fixed',
              top: '50%',
              left: '50%',
              xPercent: -50,
              yPercent: -50,
              scale: scale,
              zIndex: 40,
              opacity: opacity,
              filter: `blur(${progress * 2}px)`,
              willChange: 'transform, opacity, filter',
            });

            // Animate floating texts
            if (textContainerRef.current) {
              gsap.set(textContainerRef.current, {
                opacity: Math.max(0, 1 - progress * 1.5),
                scale: 0.8 + (1 - progress) * 0.2,
              });
            }
          },
          // onComplete: () => {
          //   // Smooth fade out after scroll complete
          //   gsap.to(animationRef.current, {
          //     opacity: 0,
          //     scale: 0.3,
          //     duration: 0.5,
          //     ease: 'power2.out',
          //     onComplete: () => {
          //       if (animationRef.current) {
          //         gsap.set(animationRef.current, {
          //           pointerEvents: 'none',
          //           visibility: 'hidden',
          //         });
          //       }
          //     },
          //   });
          // },
        });
      } else {
        // Reset to normal positioning when not in walkthrough mode
        gsap.set(animationRef.current, {
          position: 'relative',
          top: 'auto',
          left: 'auto',
          xPercent: 0,
          yPercent: 0,
          scale: 1,
          zIndex: 'auto',
          opacity: 1,
          pointerEvents: 'auto',
          visibility: 'visible',
          filter: 'none',
          clearProps: 'transform',
        });

        if (textContainerRef.current) {
          gsap.set(textContainerRef.current, {
            opacity: 1,
            scale: 1,
          });
        }

        // Add gentle floating animation when in normal mode
        gsap.to(animationRef.current, {
          y: -10,
          duration: 3,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        });

        // Parallax effect for floating texts
        gsap.to('.hero-floating-text', {
          y: -30,
          ease: 'none',
          stagger: 0.02,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    }, containerRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isInWalkthroughMode, prefersReducedMotion]);

  return (
    <div ref={containerRef} className={styles.animationWrapper}>
      <div ref={animationRef} className={styles.lottieContainer}>
        <div ref={textContainerRef} className={styles.heroAnimationTexts}>
          <p className="hero-floating-text">WA businesses feel confident about future growth</p>
          <p className="hero-floating-text">AI can&apos;t replace real creativity</p>
          <p className="hero-floating-text">Sales measure true process</p>
          <p className="hero-floating-text">Human connection drives WA business</p>
          <p className="hero-floating-text">
            The primary barrier to digital transformation is financial investment
          </p>
        </div>

        <LottieWithGradientMask
          className="w-full h-full"
          blendMode="overlay"
          autoplay={true}
          opacity={0.7}
          alt="Interactive data visualization animation showing charts, graphs, and insights transforming"
          respectsReducedMotion={true}
          onError={() => {
            console.warn('Hero Lottie animation failed to load');
          }}
        />
      </div>
    </div>
  );
}
