'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { parseAsStringEnum, useQueryState } from 'nuqs';
import { PageState } from '@/global/enums/pageState';
import { QueryState } from '@/global/enums/queryState';

const PAGE_STATES_SECTIONS = {
  [PageState.Hero]: '#hero',
  [PageState.Walkthrough]: '#walkthrough',
  [PageState.Form]: '#form',
};

export function useSmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);
  const [pageState] = useQueryState(
    QueryState.PageState,
    parseAsStringEnum<PageState>(Object.values(PageState)).withDefault(PageState.Hero)
  );

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add(time => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Handle smooth scrolling for anchor links
    const handleAnchorClick = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      if (target.tagName === 'A') {
        const href = target.getAttribute('href');
        if (href?.startsWith('#')) {
          e.preventDefault();
          const element = document.querySelector(href) as HTMLElement;
          if (element) {
            lenis.scrollTo(element, {
              offset: -100, // Account for fixed headers
              duration: 2,
            });
          }
        }
      }
    };

    if (pageState) {
      scrollTo(PAGE_STATES_SECTIONS[pageState]);
    }

    // Cleanup
    return () => {
      document.removeEventListener('click', handleAnchorClick);
      lenis.destroy();
      gsap.ticker.remove(time => {
        lenis.raf(time * 1000);
      });
    };
  }, []);

  useEffect(() => {
    if (pageState !== PageState.Hero) {
      scrollTo(PAGE_STATES_SECTIONS[pageState]);
    } else {
      scrollToTop();
    }
  }, [pageState]);

  const scrollTo = (
    target: string | HTMLElement,
    options?: { offset?: number; duration?: number }
  ) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, {
        offset: options?.offset || 0,
        duration: options?.duration || 2,
      });
    }
  };

  const scrollToTop = () => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { duration: 1.5 });
    }
  };

  return {
    lenis: lenisRef.current,
    scrollTo,
    scrollToTop,
  };
}
