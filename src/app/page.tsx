'use client';

import { ChangeEventHandler, useState } from 'react';
import { HeroAnimation, HeroSection } from '@/modules/hero';
import { WalkthroughSection } from '@/modules/walkthrough';
import { FormSection, CompleteFormData } from '@/modules/form';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

export default function Home() {
  const [formData, setFormData] = useState<CompleteFormData | null>(null);
  const [_currentFormStep, setCurrentFormStep] = useState(0);
  useSmoothScroll();

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = e => {
    const { name: key, value } = e.target;

    setFormData(
      prevData =>
        ({
          ...(prevData || {}),
          [key]: value,
        }) as CompleteFormData
    );
  };

  const handleFormStepComplete = (step: number, value: string) => {
    const fieldName = step === 0 ? 'firstName' : 'emailAddress';

    const updatedFormData = {
      ...(formData || {}),
      [fieldName]: value,
    } as CompleteFormData;

    setFormData(updatedFormData);

    try {
      localStorage.setItem('formData', JSON.stringify(updatedFormData));
      window.dispatchEvent(
        new CustomEvent('formDataUpdated', {
          detail: { formData: updatedFormData },
        })
      );
      window.dispatchEvent(new Event('storage'));
    } catch (error) {
      console.error('Error saving form data to localStorage:', error);
    }

    setCurrentFormStep(step + 1);
  };

  return (
    <main className="relative">
      <Header />
      <HeroAnimation />
      <HeroSection />
      <WalkthroughSection />
      <FormSection />
      <Footer onInputChange={handleInputChange} onFormStepComplete={handleFormStepComplete} />
    </main>
  );
}
