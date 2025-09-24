'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGSAPAnimation } from './useGSAPAnimation';

// Register ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface ScrollAnimationConfig {
  trigger: React.RefObject<Element>;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  once?: boolean;
  markers?: boolean;
  onEnter?: () => void;
  onLeave?: () => void;
  onEnterBack?: () => void;
  onLeaveBack?: () => void;
}

export function useScrollAnimation(
  element: React.RefObject<Element>,
  animation: gsap.TweenVars,
  config: ScrollAnimationConfig
) {
  const {
    trigger,
    start = 'top 80%',
    end = 'bottom top',
    scrub = false,
    once = false,
    markers = false,
    onEnter,
    onLeave,
    onEnterBack,
    onLeaveBack,
  } = config;

  const { contextSafe } = useGSAPAnimation(
    () => {
      if (!element.current || !trigger.current) return;

      gsap.fromTo(
        element.current,
        { opacity: 0, y: 50 },
        {
          ...animation,
          scrollTrigger: {
            trigger: trigger.current,
            start,
            end,
            scrub,
            once,
            markers,
            onEnter,
            onLeave,
            onEnterBack,
            onLeaveBack,
          },
        }
      );
    },
    { scope: trigger, dependencies: [animation] }
  );

  return { contextSafe };
}

export function useParallaxScroll(
  elements: React.RefObject<Element>[],
  config: Omit<ScrollAnimationConfig, 'once'> & {
    speeds?: number[];
    direction?: 'vertical' | 'horizontal';
  }
) {
  const {
    trigger,
    start = 'top bottom',
    end = 'bottom top',
    speeds = [1],
    direction = 'vertical',
    markers = false,
  } = config;

  useGSAPAnimation(
    () => {
      elements.forEach((element, index) => {
        if (!element.current || !trigger.current) return;

        const speed = speeds[index] || speeds[0] || 1;
        const property = direction === 'vertical' ? 'y' : 'x';

        gsap.to(element.current, {
          [property]: -50 * speed,
          ease: 'none',
          scrollTrigger: {
            trigger: trigger.current,
            start,
            end,
            scrub: true,
            markers,
          },
        });
      });
    },
    { scope: trigger, dependencies: [speeds, direction] }
  );
}
