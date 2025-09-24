'use client';

import { useRef, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

export interface GSAPAnimationOptions {
  scope?: React.RefObject<Element>;
  dependencies?: React.DependencyList;
}

export function useGSAPAnimation(
  animationFn: () => gsap.core.Timeline | void,
  options: GSAPAnimationOptions = {}
) {
  const { scope, dependencies = [] } = options;
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const { context, contextSafe } = useGSAP(
    () => {
      const result = animationFn();
      if (result && typeof result.kill === 'function') {
        timelineRef.current = result;
      }
    },
    { scope, dependencies }
  );

  const cleanup = useCallback(() => {
    if (timelineRef.current) {
      timelineRef.current.kill();
      timelineRef.current = null;
    }
    context.revert();
  }, [context]);

  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  return {
    contextSafe,
    timeline: timelineRef.current,
    cleanup,
  };
}
