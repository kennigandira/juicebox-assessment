'use client';

import { ChangeEventHandler, useState } from 'react';
import { useQueryState, parseAsInteger, parseAsStringLiteral, parseAsStringEnum } from 'nuqs';
import { HeroAnimation, HeroSection } from '@/modules/hero';
import { WalkthroughSection } from '@/modules/walkthrough';
import { FormSection, CompleteFormData } from '@/modules/form';
import { Walkthrough } from '@/components/sections/Walkthrough';
import { Results } from '@/components/sections/Results';
import { useSmoothScroll } from '@/global';
import { AppState, Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { QueryState } from '@/global/enums/queryState';
import { PageState } from '@/global/enums/pageState';

export default function Home() {
  const [pageState, setPageState] = useQueryState(
    QueryState.PageState,
    parseAsStringEnum<PageState>(Object.values(PageState)).withDefault(PageState.Hero)
  );
  const [formData, setFormData] = useState<CompleteFormData | null>(null);
  const { scrollTo } = useSmoothScroll();

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name: key, value } = e.target;

    setFormData(
      prevData =>
        ({
          ...(prevData || {}),
          [key]: value,
        }) as CompleteFormData
    );
  };

  console.debug('====CEK SINI BOS', { formData });

  // const handleHeroCtaClick = () => {
  //   setPageState('walkthrough');
  //   setTimeout(() => {
  //     scrollTo('#walkthrough');
  //   }, 100);
  // };

  const handleWalkthroughComplete = () => {
    setPageState(PageState.Form);
    setTimeout(() => {
      scrollTo('#tutorial');
    }, 100);
  };

  const handleWalkthroughBack = () => {
    setPageState(PageState.Hero);
    setTimeout(() => {
      scrollTo('top');
    }, 100);
  };

  // const handleTutorialComplete = () => {
  //   setPageState('form');
  //   setTimeout(() => {
  //     scrollTo('#form');
  //   }, 100);
  // };

  const handleFormComplete = (data: CompleteFormData) => {
    setFormData(data);
    // setPageState('results');
    // setTimeout(() => {
    //   scrollTo('#results');
    // }, 100);
  };

  // const handleRestart = () => {
  //   setPageState('hero');
  //   setFormData(null);
  //   setTimeout(() => {
  //     scrollTo('top');
  //   }, 100);
  // };

  return (
    <main className="relative">
      {/* Sticky Header */}
      <Header />
      <HeroAnimation />

      {/* Hero Section */}
      <HeroSection />

      {/* Walkthrough Section - Show after hero CTA is clicked */}
      {/* {(currentState === 'walkthrough' ||
        currentState === 'form' ||
        currentState === 'results') && (
      )} */}

      <WalkthroughSection onComplete={handleWalkthroughComplete} onBack={handleWalkthroughBack} />

      {/* Tutorial Section - Show after walkthrough is completed */}
      {/* {(currentState === 'tutorial' || currentState === 'form' || currentState === 'results') && (
        <Walkthrough onGetStarted={handleTutorialComplete} />
      )} */}

      {/* Multi-step Form Section - Show after tutorial is completed */}
      <FormSection />

      {/* Results Section - Show after form is completed */}
      {/* {currentState === 'results' && formData && (
        <Results formData={formData} onRestart={handleRestart} />
      )} */}

      <Footer onInputChange={handleInputChange} />
    </main>
  );
}
