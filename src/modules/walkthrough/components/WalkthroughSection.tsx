'use client';

import { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { gsap } from 'gsap';
import { Button } from '@/shared/ui';
import { useStepNavigation } from '@/shared/navigation';
import { useGSAPAnimation } from '@/shared/animations';
import { ArrowLeftIcon } from '@/components/icons';
import styles from '../styles/Walkthrough.module.css';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';

interface WalkthroughSectionProps {
  onComplete: () => void;
  onBack?: () => void;
}

const walkthroughSteps = [
  "Professionals around the world shared how they feel about technology and I've listened. Now it's your turn.",
  "I'll ask you a handful of meaningful questions and compare your responses with people in your industry.",
  "You'll get insights into current industry sentiments and a reality check about technology in a few minutes. Deal? Great!",
];

export function WalkthroughSection({ onComplete, onBack }: WalkthroughSectionProps) {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const backButtonRef = useRef<HTMLButtonElement>(null);
  const stepIndicatorsRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const { currentStep, isFirstStep, isLastStep, goToNext, goToPrev, goToStep } = useStepNavigation({
    totalSteps: walkthroughSteps.length,
    onStepChange: (step, direction) => {
      if (swiper) {
        swiper.slideTo(step - 1, 300);
      }
    },
  });

  // Entrance animations
  useGSAPAnimation(
    () => {
      if (!containerRef.current) return;

      const tl = gsap.timeline();

      // Set initial states
      gsap.set([backButtonRef.current, stepIndicatorsRef.current, buttonRef.current], {
        opacity: 0,
        y: 20,
      });

      // Animate entrance
      tl.fromTo(
        backButtonRef.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' }
      )
        .to(
          stepIndicatorsRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power2.out',
          },
          '-=0.3'
        )
        .to(
          buttonRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power2.out',
          },
          '-=0.2'
        );

      return tl;
    },
    { scope: containerRef }
  );

  const handleSlideChange = (swiperInstance: SwiperType) => {
    // Sync step navigation with swiper
    const newStep = swiperInstance.activeIndex + 1;
    if (newStep !== currentStep) {
      goToStep(newStep);
    }
  };

  const handleBack = () => {
    if (isFirstStep && onBack) {
      onBack();
    } else {
      goToPrev();
    }
  };

  const handleContinue = () => {
    if (isLastStep) {
      onComplete();
    } else {
      goToNext();
    }
  };

  const getButtonText = () => {
    if (isLastStep) return 'Get Started';
    return 'Continue';
  };

  return (
    <div ref={containerRef} className={styles.walkthrough}>
      {/* Back Button */}
      <button
        ref={backButtonRef}
        onClick={handleBack}
        className={styles.backButton}
        aria-label={isFirstStep ? 'Go back to hero' : 'Go to previous step'}
      >
        <ArrowLeftIcon direction="left" color="#ffffff" />
      </button>

      {/* Content */}
      <div className={styles.content}>
        <Swiper
          modules={[EffectFade]}
          effect="slide"
          fadeEffect={{
            crossFade: true,
          }}
          allowTouchMove={false}
          spaceBetween={0}
          slidesPerView={1}
          onSwiper={setSwiper}
          onSlideChange={handleSlideChange}
          className={styles.swiper}
        >
          {walkthroughSteps.map((step, index) => (
            <SwiperSlide key={index}>
              <div className={styles.slide}>
                <h3 className={styles.stepContent}>{step}</h3>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Step Indicators */}
        <div ref={stepIndicatorsRef} className={styles.stepIndicators}>
          {walkthroughSteps.map((_, index) => (
            <button
              key={index}
              onClick={() => goToStep(index + 1)}
              className={`${styles.stepDot} ${
                index + 1 === currentStep ? styles.stepDotActive : styles.stepDotInactive
              }`}
              aria-label={`Go to step ${index + 1}`}
            />
          ))}
        </div>

        {/* Action Button */}
        <Button
          ref={buttonRef}
          onClick={handleContinue}
          className={styles.actionButton}
          size="lg"
          variant={isLastStep ? 'primary' : 'outline'}
        >
          {getButtonText()}
        </Button>
      </div>
    </div>
  );
}
