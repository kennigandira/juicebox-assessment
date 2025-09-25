'use client';

import { HeroContent } from './HeroContent';
import styles from '../styles/Hero.module.css';

export function HeroSection() {
  return (
    <section id="hero" className={styles.hero}>
      <HeroContent />
    </section>
  );
}
