'use client';

import React from 'react';
import { gsap } from 'gsap';
import { useGSAPAnimation } from '@/shared/animations';

export function useHeroAnimations(containerRef: React.RefObject<HTMLElement>) {
  // Initial entrance animations
  useGSAPAnimation(
    () => {
      const tl = gsap.timeline({ delay: 0.2 });

      // Set initial states
      gsap.set('.hero-floating-text', { opacity: 0, y: 20 });

      // Animate entrance
      // tl.to(logoContainerRef.current, {
      //   opacity: 1,
      //   y: 0,
      //   duration: 0.6,
      //   ease: 'power2.out',
      // }).to(
      //   '.hero-floating-text',
      //   {
      //     opacity: 1,
      //     y: 0,
      //     duration: 0.4,
      //     stagger: 0.1,
      //     ease: 'power2.out',
      //   },
      //   '-=0.4'
      // );

      return tl;
    },
    { scope: containerRef }
  );
}
