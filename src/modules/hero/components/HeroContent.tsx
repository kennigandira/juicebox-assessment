'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import styles from '../styles/Hero.module.css';

export function HeroContent() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

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
