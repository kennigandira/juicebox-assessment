'use client';

import { useRef } from 'react';
import { HeroAnimation } from './HeroAnimation';
import { HeroContent } from './HeroContent';
import { useHeroAnimations } from '../hooks/useHeroAnimations';
import styles from '../styles/Hero.module.css';

interface HeroSectionProps {
  onCtaClick: () => void;
  currentState?: 'hero' | 'walkthrough' | 'tutorial' | 'form' | 'results';
}

export function HeroSection({ onCtaClick, currentState = 'hero' }: HeroSectionProps) {
  const containerRef = useRef<HTMLElement>(null);

  useHeroAnimations(containerRef);

  return (
    <section ref={containerRef} className={styles.hero}>
      <HeroAnimation isInWalkthroughMode={currentState !== 'hero'} />

      <HeroContent onCtaClick={onCtaClick} />
    </section>
  );
}
