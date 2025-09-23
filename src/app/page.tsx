'use client';

import { useState } from 'react';
import { Hero } from '@/components/sections/Hero';
import { Tutorial } from '@/components/sections/Tutorial';
import { MultiStepForm } from '@/components/sections/MultiStepForm';
import { Results } from '@/components/sections/Results';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

type FormData = {
  firstName: string;
  email: string;
};

type AppState = 'hero' | 'tutorial' | 'form' | 'results';

export default function Home() {
  const [currentState, setCurrentState] = useState<AppState>('hero');
  const [formData, setFormData] = useState<FormData | null>(null);
  const { scrollTo } = useSmoothScroll();

  const handleHeroCtaClick = () => {
    setCurrentState('tutorial');
    setTimeout(() => {
      scrollTo('#tutorial');
    }, 100);
  };

  const handleTutorialComplete = () => {
    setCurrentState('form');
    setTimeout(() => {
      scrollTo('#form');
    }, 100);
  };

  const handleFormComplete = (data: FormData) => {
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

  return (
    <main className="relative">
      {/* Hero Section */}
      <Hero onCtaClick={handleHeroCtaClick} />

      {/* Tutorial Section - Show after hero CTA is clicked */}
      {(currentState === 'tutorial' || currentState === 'form' || currentState === 'results') && (
        <Tutorial onGetStarted={handleTutorialComplete} />
      )}

      {/* Multi-step Form Section - Show after tutorial is completed */}
      {(currentState === 'form' || currentState === 'results') && (
        <MultiStepForm onComplete={handleFormComplete} />
      )}

      {/* Results Section - Show after form is completed */}
      {currentState === 'results' && formData && (
        <Results formData={formData} onRestart={handleRestart} />
      )}
    </main>
  );
}
