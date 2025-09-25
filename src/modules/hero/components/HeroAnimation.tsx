'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { LottieWithGradientMask } from '@/shared/animations';
import styles from '../styles/Hero.module.css';
import { parseAsStringEnum, useQueryState } from 'nuqs';
import { QueryState } from '@/global/enums/queryState';
import { PageState } from '@/global/enums/pageState';

const HERO_ANIMATION_TEXTS = [
  'WA businesses feel confident about future growth',
  "AI can't replace real creativity",
  'Sales measure true process',
  'Human connection drives WA business',
  'The primary barrier to digital transformation is financial investment',
];

gsap.registerPlugin(useGSAP);

export function HeroAnimation() {
  const animationRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [pageState] = useQueryState(
    QueryState.PageState,
    parseAsStringEnum<PageState>(Object.values(PageState)).withDefault(PageState.Hero)
  );

  useGSAP(() => {
    if (pageState === PageState.Walkthrough) {
      gsap.to(containerRef.current, { scale: '0.7', duration: 1 });
      gsap.to(textContainerRef.current, { display: 'none', opacity: 0 });
    }

    if (pageState === PageState.Hero) {
      gsap.to(textContainerRef.current, { display: 'block', opacity: 1 });
      gsap.to(containerRef.current, { scale: '1', duration: 1 });
    }

    if (pageState === PageState.Form) {
      gsap.to(containerRef.current, { scale: '0.1', duration: 1 });
      gsap.to(textContainerRef.current, { display: 'none', opacity: 0 });
    }
  }, [pageState]);

  return (
    <div ref={containerRef} className={styles.animationWrapper}>
      <div ref={animationRef} className={styles.lottieContainer}>
        <div ref={textContainerRef} className={styles.heroAnimationTexts}>
          {HERO_ANIMATION_TEXTS.map(text => (
            <p key={text} className="hero-floating-text">
              {text}
            </p>
          ))}
        </div>

        <LottieWithGradientMask
          className="w-full h-full"
          blendMode="overlay"
          autoplay={true}
          opacity={0.7}
          alt="Interactive data visualization animation showing charts, graphs, and insights transforming"
          onError={() => {
            console.warn('Hero Lottie animation failed to load');
          }}
        />
      </div>
    </div>
  );
}
