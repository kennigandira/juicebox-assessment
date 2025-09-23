'use client';

import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectFade, Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { gsap } from 'gsap';
import styles from './Tutorial.module.css';

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

const tutorialSlides: TutorialSlide[] = [
  {
    id: 1,
    title: 'Interactive Animations',
    description:
      'Experience smooth, engaging animations powered by GSAP and Lottie that bring your interface to life.',
    icon: (
      <svg className={styles.slideIcon} viewBox="0 0 24 24">
        <path d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    id: 2,
    title: 'Intuitive Forms',
    description:
      'Multi-step forms with real-time validation, accessible design, and seamless user experience.',
    icon: (
      <svg className={styles.slideIcon} viewBox="0 0 24 24">
        <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    id: 3,
    title: 'Smooth Scrolling',
    description:
      'Enhanced user experience with Lenis smooth scrolling and responsive design across all devices.',
    icon: (
      <svg className={styles.slideIcon} viewBox="0 0 24 24">
        <path d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: 4,
    title: 'Modern Technology',
    description:
      'Built with Next.js, TypeScript, and modern web technologies for optimal performance and maintainability.',
    icon: (
      <svg className={styles.slideIcon} viewBox="0 0 24 24">
        <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
];

export function Tutorial({ onGetStarted }: TutorialProps) {
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

  const isLastSlide = currentSlide === tutorialSlides.length - 1;

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
      <div className={styles.container}>
        <h2 ref={titleRef} className={styles.title}>
          Discover Our Features
        </h2>

        <div className={styles.swiperContainer}>
          <Swiper
            modules={[Navigation, Pagination, EffectFade, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation={{
              prevEl: '.swiper-button-prev-custom',
              nextEl: '.swiper-button-next-custom',
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
              dynamicMainBullets: 3,
            }}
            effect="fade"
            fadeEffect={{
              crossFade: true,
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            onSwiper={setSwiper}
            onSlideChange={handleSlideChange}
            className="tutorial-swiper h-96"
          >
            {tutorialSlides.map(slide => (
              <SwiperSlide key={slide.id}>
                <div className={styles.slide}>
                  <div>{slide.icon}</div>
                  <h3 className={styles.slideTitle}>{slide.title}</h3>
                  <p className={styles.slideDescription}>{slide.description}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation */}
          <button
            className={`swiper-button-prev-custom ${styles.navButton} ${styles.navButtonPrev}`}
            aria-label="Previous slide"
          >
            <svg className={styles.navIcon} viewBox="0 0 24 24">
              <path d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            className={`swiper-button-next-custom ${styles.navButton} ${styles.navButtonNext}`}
            aria-label="Next slide"
          >
            <svg className={styles.navIcon} viewBox="0 0 24 24">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Progress indicator */}
        <div className={styles.progressContainer}>
          <span className={styles.progressText}>
            {currentSlide + 1} of {tutorialSlides.length}
          </span>
          <div className={styles.progressDots}>
            {tutorialSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => swiper?.slideTo(index)}
                className={`${styles.progressDot} ${
                  index === currentSlide ? styles.progressDotActive : styles.progressDotInactive
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Get Started Button - only show on last slide */}
        <div
          className={`${styles.buttonContainer} ${
            isLastSlide ? styles.buttonContainerVisible : styles.buttonContainerHidden
          }`}
        >
          <button onClick={handleGetStarted} className={styles.getStartedButton}>
            Get Started
          </button>
        </div>
      </div>
    </section>
  );
}
