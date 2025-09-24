'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAPAnimation } from '@/shared/animations';
import styles from '../styles/Hero.module.css';

export function HeroContent() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAPAnimation(
    () => {
      if (!titleRef.current) return;

      const timeline = gsap.timeline({ delay: 0.5 });

      // Set initial states
      gsap.set([titleRef.current], { opacity: 0, y: 30 });

      // Animate entrance
      timeline.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
      });
    },
    { scope: contentRef }
  );

  return (
    <div ref={contentRef} className={styles.contentContainer}>
      <div className={styles.textContent}>
        <h2 ref={titleRef} className={styles.title}>
          Compare your thoughts on
          <span className={styles.titleGradient}> technology </span>
          <span className={styles.titleWhite}>with current industry opinions.</span>
        </h2>
      </div>
    </div>
  );
}
