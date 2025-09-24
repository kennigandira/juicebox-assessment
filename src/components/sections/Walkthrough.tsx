'use client';

import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectFade, Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { gsap } from 'gsap';
import styles from './Walkthrough.module.css';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

interface TutorialSlide {
  id: number;
  title: string;
  description: string;
  imageUrl?: string;
  icon: React.ReactNode;
}

interface TutorialProps {
  onGetStarted: () => void;
}

const walkthroughSteps = [
  "Professionals around the world shared how they feel about technology and I've listened. Now it's your turn.",
  "I'll ask you a handful of meaningful questions and compare your responses with people in your industry.",
  "You'll get insights into current industry sentiments and a reality check about technology in a few minutes. Deal? Great!",
];

export const WALKTHROUGH_STEPS_TOTAL = 2;

export function Walkthrough({ onGetStarted }: TutorialProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const isLastSlide = currentSlide === walkthroughSteps.length - 1;

  const handleSlideChange = (swiper: SwiperType) => {
    setCurrentSlide(swiper.activeIndex);
  };

  const handleGetStarted = () => {
    gsap.to(sectionRef.current, {
      opacity: 0,
      y: -50,
      duration: 0.5,
      ease: 'power2.in',
      onComplete: onGetStarted,
    });
  };

  return (
    <section ref={sectionRef} className={styles.tutorial} id="tutorial">
      <div className={styles.tutorialSwiper}>
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
        >
          {walkthroughSteps.map((step, index) => (
            <SwiperSlide key={index}>
              <h4 className={styles.tutorialContent}>{step}</h4>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {/* <div ref={stepIndicatorsRef} className={styles.stepIndicators}>
        {tutorialSteps.map((_, index) => (
          <div
            key={index}
            className={`${styles.stepDot} ${
              index + 1 === currentStep ? styles.stepDotActive : styles.stepDotInactive
            }`}
          />
        ))}
      </div> */}
    </section>
  );
}
