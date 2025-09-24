'use client';

import { useState, useCallback } from 'react';

export interface StepNavigationConfig {
  totalSteps: number;
  initialStep?: number;
  onStepChange?: (step: number, direction: 'next' | 'prev') => void;
  canNavigateNext?: (currentStep: number) => boolean;
  canNavigatePrev?: (currentStep: number) => boolean;
}

export function useStepNavigation({
  totalSteps,
  initialStep = 1,
  onStepChange,
  canNavigateNext = () => true,
  canNavigatePrev = () => true,
}: StepNavigationConfig) {
  const [currentStep, setCurrentStep] = useState(initialStep);

  const goToNext = useCallback(() => {
    if (currentStep < totalSteps && canNavigateNext(currentStep)) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      onStepChange?.(nextStep, 'next');
    }
  }, [currentStep, totalSteps, canNavigateNext, onStepChange]);

  const goToPrev = useCallback(() => {
    if (currentStep > 1 && canNavigatePrev(currentStep)) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      onStepChange?.(prevStep, 'prev');
    }
  }, [currentStep, canNavigatePrev, onStepChange]);

  const goToStep = useCallback(
    (step: number) => {
      if (step >= 1 && step <= totalSteps) {
        const direction = step > currentStep ? 'next' : 'prev';
        setCurrentStep(step);
        onStepChange?.(step, direction);
      }
    },
    [currentStep, totalSteps, onStepChange]
  );

  const reset = useCallback(() => {
    setCurrentStep(initialStep);
  }, [initialStep]);

  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === totalSteps;
  const progress = (currentStep / totalSteps) * 100;

  return {
    currentStep,
    isFirstStep,
    isLastStep,
    progress,
    goToNext,
    goToPrev,
    goToStep,
    reset,
    canGoNext: !isLastStep && canNavigateNext(currentStep),
    canGoPrev: !isFirstStep && canNavigatePrev(currentStep),
  };
}
