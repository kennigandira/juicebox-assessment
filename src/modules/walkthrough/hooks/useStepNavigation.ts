'use client';

import { useState, useCallback } from 'react';

export interface StepNavigationConfig {
  totalSteps: number;
  initialStep?: number;
  onStepChange?: (step: number, direction: 'next' | 'prev') => void;
}

export function useStepNavigation({
  totalSteps,
  initialStep = 1,
  onStepChange,
}: StepNavigationConfig) {
  const [currentStep, setCurrentStep] = useState(initialStep);

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

  return {
    currentStep,
    goToStep,
  };
}
