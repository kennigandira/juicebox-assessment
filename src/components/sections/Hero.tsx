'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { TextPlugin } from 'gsap/dist/TextPlugin';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { ArrowLeftIcon, RefreshIcon } from '@/components/icons';
import styles from './Hero.module.css';
import { LottieWithGradientMask } from '../animations/LottieWithGradientMask';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP, ScrollTrigger, TextPlugin);
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';

interface HeroProps {
  onCtaClick: () => void;
}

const tutorialSteps = [
  "Professionals around the world shared how they feel about technology and I've listened. Now it's your turn.",
  "I'll ask you a handful of meaningful questions and compare your responses with people in your industry.",
  "You'll get insights into current industry sentiments and a reality check about technology in a few minutes. Deal? Great!",
];

export function Hero({ onCtaClick }: HeroProps) {
  const [isTutorialMode, setIsTutorialMode] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [swiper, setSwiper] = useState<SwiperType | null>(null);

  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const animationRef = useRef<HTMLDivElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);
  const stepIndicatorsRef = useRef<HTMLDivElement>(null);
  const backButtonRef = useRef<HTMLButtonElement>(null);
  const heroAnimationTextsRef = useRef<HTMLDivElement>(null);
  const tutorialSwiperRef = useRef<HTMLDivElement>(null);
  const logoContainerRef = useRef<HTMLDivElement>(null);

  // Initial entrance animations
  useGSAP(
    () => {
      const tl = gsap.timeline({ delay: 0.2 });

      // Set initial states
      gsap.set([titleRef.current, buttonRef.current], { opacity: 0, y: 30 });
      gsap.set(animationRef.current, { opacity: 0, scale: 0.8 });
      gsap.set(logoContainerRef.current, { opacity: 0, y: -20 });
      gsap.set('.hero-floating-text', { opacity: 0, y: 20 });

      // Animate entrance
      tl.to(logoContainerRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
      })
        .to(
          animationRef.current,
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: 'back.out(1.7)',
          },
          '-=0.3'
        )
        .to(
          titleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
          },
          '-=0.4'
        )
        .to(
          buttonRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
          },
          '-=0.3'
        )
        .to(
          '.hero-floating-text',
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.1,
            ease: 'power2.out',
          },
          '-=0.4'
        );
    },
    { scope: containerRef }
  );

  // ScrollTrigger animations
  useGSAP(
    () => {
      // Parallax effect for animation container
      gsap.to(animationRef.current, {
        y: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Floating text parallax
      gsap.to('.hero-floating-text', {
        y: -30,
        ease: 'none',
        stagger: 0.02,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    },
    { scope: containerRef }
  );

  // Context-safe animation functions
  const { contextSafe } = useGSAP({ scope: containerRef });

  const animateToTutorialMode = contextSafe(() => {
    const timeline = gsap.timeline();

    timeline
      .to(buttonRef.current, {
        duration: 0.3,
        text: 'Continue',
        ease: 'none',
        background: 'transparent',
        color: '#ffffff',
      })
      .to(heroAnimationTextsRef.current, {
        opacity: 0,
        duration: 0.4,
        ease: 'power2.out',
      })
      .to(
        animationRef.current,
        {
          scale: 0.5,
          duration: 0.8,
          ease: 'power2.out',
        },
        '-=0.2'
      )
      .to(
        tutorialSwiperRef.current,
        {
          y: -100,
          duration: 0.6,
          ease: 'power2.out',
        },
        '-=0.4'
      )
      .fromTo(
        backButtonRef.current,
        {
          opacity: 0,
          x: -20,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          ease: 'power2.out',
        },
        '-=0.3'
      );

    timeline.fromTo(
      stepIndicatorsRef.current,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
        display: 'flex',
      },
      '-=0.2'
    );

    setIsTutorialMode(true);
    setCurrentStep(1);
  });

  const animateBackToNormal = contextSafe(() => {
    const timeline = gsap.timeline();

    timeline
      .to(buttonRef.current, {
        duration: 0.3,
        text: 'Get a reality check',
        ease: 'none',
        background: '#cdaaff',
        color: '#0c0d10',
      })
      .to(backButtonRef.current, {
        opacity: 0,
        x: -20,
        duration: 0.3,
        ease: 'power2.in',
      })
      .to(
        stepIndicatorsRef.current,
        {
          opacity: 0,
          y: 20,
          duration: 0.4,
          ease: 'power2.in',
          display: 'none',
        },
        '-=0.1'
      )
      .to(
        textContentRef.current,
        {
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
        },
        '-=0.2'
      )
      .to(
        tutorialSwiperRef.current,
        {
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
        },
        '-=0.4'
      )
      .to(
        animationRef.current,
        {
          scale: 1,
          duration: 0.8,
          ease: 'power2.out',
        },
        '-=0.4'
      )
      .to(
        heroAnimationTextsRef.current,
        {
          opacity: 1,
          duration: 0.4,
          ease: 'power2.out',
          onComplete: () => {
            setIsTutorialMode(false);
            setCurrentStep(0);
            if (swiper) {
              swiper.slideTo(0, 0);
            }
          },
        },
        '-=0.2'
      );
  });

  const handleGoBack = () => {
    if (currentStep === 1) {
      animateBackToNormal();
    } else if (currentStep > 1 && swiper) {
      swiper.slidePrev();
      gsap.to(buttonRef.current, {
        duration: 0.3,
        text: 'Continue',
        ease: 'none',
        background: 'transparent',
        color: '#ffffff',
      });
    }
  };

  const handleSlideChange = (swiperInstance: SwiperType) => {
    // Swiper index 0-2 maps to steps 1-3
    setCurrentStep(swiperInstance.activeIndex + 1);
  };

  const handleCtaClick = contextSafe(() => {
    // const button = buttonRef.current?.querySelector('button');
    if (!isTutorialMode) {
      if (buttonRef.current) {
        gsap.to(buttonRef.current, {
          duration: 0.1,
          yoyo: true,
          repeat: 1,
          ease: 'power2.inOut',
          background: 'transparent',
        });
      }
      animateToTutorialMode();
    } else {
      if (currentStep < tutorialSteps.length) {
        if (swiper) {
          swiper.slideNext();
          if (buttonRef.current && currentStep === 2) {
            gsap.to(buttonRef.current, {
              duration: 0.3,
              text: 'Get Started',
              ease: 'none',
              background: 'white',
              color: '#0C0D10',
            });
          }
        }
      } else {
        onCtaClick();
      }
    }
  });

  const buttonClassname = isTutorialMode ? `${styles.cta} ${styles.ctaOutlined}` : styles.cta;
  const buttonText = !isTutorialMode ? 'Get a reality check' : 'Continue';

  return (
    <section ref={containerRef} className={styles.hero}>
      <div ref={logoContainerRef} className={styles.logoContainer}>
        {isTutorialMode && (
          <button
            ref={backButtonRef}
            onClick={handleGoBack}
            className={styles.backButton}
            aria-label="Go back"
          >
            <ArrowLeftIcon direction="left" color="#ffffff" />
          </button>
        )}
        <Image src="/jb-logo.png" alt="Juicebox Logo" width={120} height={40} priority />
        <button className={styles.refreshButton}>
          <RefreshIcon />
        </button>
      </div>

      {/* Lottie Animation with Gradient Background */}
      <div ref={animationRef} className={styles.animationWrapper}>
        <div className={styles.lottieContainer}>
          <div ref={heroAnimationTextsRef} className={styles.heroAnimationTexts}>
            <p className="hero-floating-text">WA businesses feel confident about future growth</p>
            <p className="hero-floating-text">AI can&apos;t replace real creativity</p>
            <p className="hero-floating-text">Sales measure true process</p>
            <p className="hero-floating-text">Human connection drives WA business</p>
            <p className="hero-floating-text">
              The primary barrier to digital transformation is financial investment
            </p>
          </div>

          <LottieWithGradientMask
            className="w-full h-full"
            blendMode="overlay"
            autoplay={false}
            opacity={0.7}
          />
        </div>
      </div>

      {/* Content container */}
      <div ref={tutorialSwiperRef} className={styles.contentContainer}>
        {/* Text content */}
        {!isTutorialMode ? (
          <div ref={textContentRef} className={styles.textContent}>
            <h2 ref={titleRef} className={styles.title}>
              Compare your thoughts on
              <span className={styles.titleGradient}> technology </span>
              <span className={styles.titleWhite}>with current industry opinions.</span>
            </h2>
          </div>
        ) : (
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
              {tutorialSteps.map((step, index) => (
                <SwiperSlide key={index}>
                  <h4 className={styles.tutorialContent}>{step}</h4>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
        <div ref={stepIndicatorsRef} className={styles.stepIndicators}>
          {tutorialSteps.map((_, index) => (
            <div
              key={index}
              className={`${styles.stepDot} ${
                index + 1 === currentStep ? styles.stepDotActive : styles.stepDotInactive
              }`}
            />
          ))}
        </div>
      </div>
      <button ref={buttonRef} onClick={handleCtaClick} className={buttonClassname}>
        {buttonText}
      </button>
    </section>
  );
}
