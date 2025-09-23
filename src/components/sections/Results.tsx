'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Button } from '@/components/ui';
// import { LottieAnimation } from '@/components/animations/LottieAnimation'

interface FormData {
  firstName: string;
  email: string;
}

interface ResultsProps {
  formData: FormData;
  onRestart: () => void;
}

export function Results({ formData, onRestart }: ResultsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Initial entrance animation
      tl.fromTo(
        animationRef.current,
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1, duration: 1, ease: 'back.out(1.7)' }
      )
        .fromTo(
          titleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
          '-=0.5'
        )
        .fromTo(
          cardRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
          '-=0.3'
        )
        .fromTo(
          buttonRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
          '-=0.2'
        );

      // Floating animation for the success icon
      gsap.to(animationRef.current, {
        y: -10,
        duration: 2,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleRestart = () => {
    const tl = gsap.timeline();

    tl.to([cardRef.current, buttonRef.current], {
      opacity: 0,
      y: -30,
      duration: 0.3,
      ease: 'power2.in',
      stagger: 0.1,
    })
      .to(
        titleRef.current,
        {
          opacity: 0,
          y: -20,
          duration: 0.3,
          ease: 'power2.in',
        },
        '-=0.2'
      )
      .to(
        animationRef.current,
        {
          opacity: 0,
          scale: 0.8,
          duration: 0.3,
          ease: 'power2.in',
        },
        '-=0.2'
      )
      .call(onRestart);
  };

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center px-4 py-20 bg-[#0a0b14]"
      id="results"
    >
      <div className="max-w-lg mx-auto text-center">
        {/* Success Animation */}
        <div ref={animationRef} className="mb-8">
          <div className="w-32 h-32 mx-auto bg-gradient-to-br from-purple-500/20 to-green-500/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20">
            <svg
              className="w-16 h-16 text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        {/* Success Title */}
        <h1
          ref={titleRef}
          className="text-3xl md:text-4xl font-bold text-white mb-8"
          style={{ fontFamily: 'var(--font-pp-agrandir)' }}
        >
          Welcome to Juicebox, {formData.firstName}!
        </h1>

        {/* Results Card */}
        <div
          ref={cardRef}
          className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20 mb-8"
        >
          <div className="text-center space-y-6">
            <div className="w-16 h-16 mx-auto bg-purple-500/20 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-purple-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>

            <h2
              className="text-xl font-semibold text-white"
              style={{ fontFamily: 'var(--font-graphik)' }}
            >
              Successfully Submitted!
            </h2>

            <p className="text-white/80" style={{ fontFamily: 'var(--font-sohne)' }}>
              Thank you for completing the form. Here&apos;s a summary of your information:
            </p>

            {/* User Data Summary */}
            <div className="bg-white/5 rounded-lg p-6 space-y-4 border border-white/10">
              <h3
                className="text-lg font-medium text-white mb-4"
                style={{ fontFamily: 'var(--font-graphik)' }}
              >
                Your Information
              </h3>

              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-white/20">
                  <span className="text-white/70">First Name:</span>
                  <span className="font-medium text-white">{formData.firstName}</span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-white/20">
                  <span className="text-white/70">Email Address:</span>
                  <span className="font-medium text-white">{formData.email}</span>
                </div>

                <div className="flex justify-between items-center py-2">
                  <span className="text-white/70">Submission Time:</span>
                  <span className="font-medium text-white">{new Date().toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="bg-purple-500/10 rounded-lg p-4 border border-purple-500/20">
              <p className="text-purple-200 text-sm" style={{ fontFamily: 'var(--font-sohne)' }}>
                <strong>What&apos;s next?</strong> We&apos;ll send a confirmation email to{' '}
                <span className="font-mono">{formData.email}</span> with your next steps.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div ref={buttonRef} className="space-y-4">
          <Button
            onClick={handleRestart}
            variant="outline"
            size="lg"
            className="px-8 py-3 text-base font-medium rounded-xl border-white/30 text-white/80 hover:bg-white/10 bg-white/5"
          >
            Start Over
          </Button>

          <div className="text-sm text-white/50">
            <p>
              Questions? Contact us at{' '}
              <a href="mailto:support@juicebox.com" className="text-purple-400 hover:underline">
                support@juicebox.com
              </a>
            </p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-20 w-20 h-20 bg-purple-500/20 rounded-full opacity-20 -z-10 blur-xl" />
        <div className="absolute bottom-20 right-20 w-16 h-16 bg-blue-500/20 rounded-full opacity-20 -z-10 blur-xl" />
        <div className="absolute top-1/3 right-10 w-12 h-12 bg-cyan-400/20 rounded-full opacity-20 -z-10 blur-xl" />
      </div>
    </section>
  );
}
