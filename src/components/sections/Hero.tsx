'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { LottieAnimation } from '@/components/animations/LottieAnimation';
import { Button } from '@/components/ui';
import { ArrowIcon, RefreshIcon } from '@/components/icons';
import styles from './Hero.module.css';

interface HeroProps {
  onCtaClick: () => void;
}

export function Hero({ onCtaClick }: HeroProps) {
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<HTMLDivElement>(null);

  const handleCtaClick = () => {
    const button = buttonRef.current?.querySelector('button');
    if (button) {
      gsap.to(button, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        onComplete: onCtaClick,
      });
    } else {
      onCtaClick();
    }
  };

  return (
    <section ref={containerRef} className={styles.hero}>
      <div className={styles.logoContainer}>
        <img src="./jb-logo.png" alt="" />
        <button className={styles.refreshButton}>
          <RefreshIcon />
        </button>
      </div>

      {/* Lottie Animation with Gradient Background */}
      <div className={styles.animationContainer}>
        <div className={styles.animationWrapper}>
          {/* Gradient background for animation */}
          {/* <div className={styles.gradientBackground}></div>
            <div className={styles.gradientBackgroundInner}></div> */}

          {/* Lottie Animation */}
          <div className={styles.lottieContainer}>
            <LottieAnimation
              className="w-full h-full"
              loop={true}
              autoplay={true}
              enhanceColors={false}
              colorTheme="default"
              lightEffect="spotlight"
              glowIntensity="high"
              enableHoverGlow={true}
              pulseSpeed={3}
            />
          </div>
        </div>
      </div>

      {/* Content container */}
      <div className={styles.contentContainer}>
        {/* Text content */}
        <div className={styles.textContent}>
          {/* Business messaging */}
          {/* <div className="space-y-4 text-white/80 text-sm tracking-wide">
            <p>WA businesses feel confident about future growth</p>
            <p>AI can&apos;t replace real creativity</p>
            <p>Sales success is driven by process</p>
            <p>Human connection drives WA business</p>
            <p>The primary barrier to digital transformation is financial investment</p>
          </div> */}

          <h1 ref={titleRef} className={styles.title}>
            Compare your thoughts on
            <span className={styles.titleGradient}>technology</span>
            <span className={styles.titleWhite}>with current industry opinions.</span>
          </h1>

          <div ref={buttonRef} className={styles.buttonContainer}>
            <button onClick={handleCtaClick} className={styles.ctaButton}>
              Get a reality check
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={styles.scrollIndicator}>
        <div className={styles.scrollArrow}>
          <ArrowIcon direction="down" className={styles.scrollIcon} aria-hidden={true} />
        </div>
      </div>
    </section>
  );
}
