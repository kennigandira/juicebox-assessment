'use client';

import { useState } from 'react';
import { HeroSection } from '@/modules/hero';
import { WalkthroughSection } from '@/modules/walkthrough';
import { FormSection, CompleteFormData } from '@/modules/form';
import { Tutorial } from '@/components/sections/Tutorial';
import { Results } from '@/components/sections/Results';
import { useSmoothScroll } from '@/global';
import { AppState, Header } from '@/components/layout/Header';

export default function Home() {
  const [currentState, setCurrentState] = useState<AppState>('hero');
  const [walkthroughStep, setWalkthroughSteps] = useState<number>(0);
  const [formData, setFormData] = useState<CompleteFormData | null>(null);
  const { scrollTo } = useSmoothScroll();

  const handleHeroCtaClick = () => {
    setCurrentState('walkthrough');
    setTimeout(() => {
      scrollTo('#walkthrough');
    }, 100);
  };

  const handleWalkthroughComplete = () => {
    setCurrentState('tutorial');
    setTimeout(() => {
      scrollTo('#tutorial');
    }, 100);
  };

  const handleWalkthroughBack = () => {
    setCurrentState('hero');
    setTimeout(() => {
      scrollTo('top');
    }, 100);
  };

  const handleTutorialComplete = () => {
    setCurrentState('form');
    setTimeout(() => {
      scrollTo('#form');
    }, 100);
  };

  const handleFormComplete = (data: CompleteFormData) => {
    setFormData(data);
    setCurrentState('results');
    setTimeout(() => {
      scrollTo('#results');
    }, 100);
  };

  const handleRestart = () => {
    setCurrentState('hero');
    setFormData(null);
    setTimeout(() => {
      scrollTo('top');
    }, 100);
  };

  const handleAppState = (state: AppState) => {
    setCurrentState(state);
  };

  return (
    <main className="relative">
      {/* Sticky Header */}
      <Header onSetAppState={handleAppState} walkthroughStep={walkthroughStep} />
      {/* Hero Section */}
      <HeroSection onCtaClick={handleHeroCtaClick} currentState={currentState} />

      {/* Walkthrough Section - Show after hero CTA is clicked */}
      {/* {(currentState === 'walkthrough' ||
        currentState === 'form' ||
        currentState === 'results') && (
      )} */}
      <section id="walkthrough">
        <WalkthroughSection onComplete={handleWalkthroughComplete} onBack={handleWalkthroughBack} />
      </section>

      {/* Tutorial Section - Show after walkthrough is completed */}
      {(currentState === 'tutorial' || currentState === 'form' || currentState === 'results') && (
        <Tutorial onGetStarted={handleTutorialComplete} />
      )}

      {/* Multi-step Form Section - Show after tutorial is completed */}
      {(currentState === 'form' || currentState === 'results') && (
        <FormSection onComplete={handleFormComplete} />
      )}

      {/* Results Section - Show after form is completed */}
      {currentState === 'results' && formData && (
        <Results formData={formData} onRestart={handleRestart} />
      )}
    </main>
  );
}
