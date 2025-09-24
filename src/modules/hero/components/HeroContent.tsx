'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { Button } from '@/shared/ui';
import { useGSAPAnimation } from '@/shared/animations';
import styles from '../styles/Hero.module.css';

interface HeroContentProps {
  onCtaClick: () => void;
}

export function HeroContent({ onCtaClick }: HeroContentProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAPAnimation(
    () => {
      if (!titleRef.current || !buttonRef.current) return;

      const timeline = gsap.timeline({ delay: 0.5 });

      // Set initial states
      gsap.set([titleRef.current, buttonRef.current], { opacity: 0, y: 30 });

      // Animate entrance
      timeline
        .to(titleRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
        })
        .to(
          buttonRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
          },
          '-=0.3'
        );
    },
    { scope: contentRef }
  );

  const handleCtaClick = () => {
    // Add button press animation
    if (buttonRef.current) {
      gsap.to(buttonRef.current, {
        duration: 0.1,
        scale: 0.95,
        yoyo: true,
        repeat: 1,
        ease: 'power2.inOut',
      });
    }
    onCtaClick();
  };

  return (
    <div ref={contentRef} className={styles.contentContainer}>
      <div className={styles.textContent}>
        <h2 ref={titleRef} className={styles.title}>
          Compare your thoughts on
          <span className={styles.titleGradient}> technology </span>
          <span className={styles.titleWhite}>with current industry opinions.</span>
        </h2>
      </div>

      <Button
        ref={buttonRef}
        onClick={handleCtaClick}
        variant="hero"
        size="lg"
        className={styles.cta}
        aria-label="Get a reality check about technology opinions"
      >
        Get a reality check
      </Button>
    </div>
  );
}
