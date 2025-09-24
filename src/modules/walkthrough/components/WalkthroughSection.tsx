'use client';

import { useState, useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { useStepNavigation } from '@/shared/navigation';
import styles from '../styles/Walkthrough.module.css';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import { parseAsInteger, parseAsStringEnum, useQueryState } from 'nuqs';
import { QueryState } from '@/global/enums/queryState';
import { PageState } from '@/global/enums/pageState';

const walkthroughSteps = [
  "Professionals around the world shared how they feel about technology and I've listened. Now it's your turn.",
  "I'll ask you a handful of meaningful questions and compare your responses with people in your industry.",
  "You'll get insights into current industry sentiments and a reality check about technology in a few minutes. Deal? Great!",
];

const INITIAL_SWIPER_INDEX = 0;

export function WalkthroughSection() {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const stepIndicatorsRef = useRef<HTMLDivElement>(null);

  const [pageState] = useQueryState(
    QueryState.PageState,
    parseAsStringEnum<PageState>(Object.values(PageState)).withDefault(PageState.Hero)
  );

  const [walkthroughStep] = useQueryState(
    QueryState.WalkthroughStep,
    parseAsInteger.withDefault(0)
  );

  const { currentStep, goToStep } = useStepNavigation({
    totalSteps: walkthroughSteps.length,
    onStepChange: (step, direction) => {
      if (swiper) {
        swiper.slideTo(step - 1, 300);
      }
    },
  });

  useEffect(() => {
    const isWalkthroughPage = pageState === PageState.Walkthrough;

    if (swiper && isWalkthroughPage) {
      if (!isNaN(walkthroughStep)) {
        swiper.slideTo(walkthroughStep);
      } else {
        swiper.slideTo(INITIAL_SWIPER_INDEX);
      }
    }
  }, [pageState, walkthroughStep]);

  // // Entrance animations
  // useGSAPAnimation(
  //   () => {
  //     if (!containerRef.current) return;

  //     const tl = gsap.timeline();

  //     // Animate entrance
  //     tl.to(
  //       stepIndicatorsRef.current,
  //       {
  //         opacity: 1,
  //         y: 0,
  //         duration: 0.5,
  //         ease: 'power2.out',
  //       },
  //       '-=0.3'
  //     ).to(
  //       buttonRef.current,
  //       {
  //         opacity: 1,
  //         y: 0,
  //         duration: 0.5,
  //         ease: 'power2.out',
  //       },
  //       '-=0.2'
  //     );

  //     return tl;
  //   },
  //   { scope: containerRef }
  // );

  const handleSlideChange = (swiperInstance: SwiperType) => {
    // Sync step navigation with swiper
    const newStep = swiperInstance.activeIndex + 1;
    if (newStep !== currentStep) {
      goToStep(newStep);
    }
  };

  return (
    <section ref={containerRef} id="walkthrough">
      <div className={styles.walkthrough}>
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
        </div>
      </div>
    </section>
  );
}
