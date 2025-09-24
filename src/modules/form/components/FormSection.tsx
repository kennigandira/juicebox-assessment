'use client';

import { useRef } from 'react';
import { FormProgress } from './FormProgress';
import { FormStep } from './FormStep';
import { useStepNavigation } from '@/shared/navigation';
import { useFormPersistence } from '../hooks/useFormValidation';
import { CompleteFormData, stepConfigs } from '../schemas/formSchemas';
import { useScrollAnimation } from '@/shared/animations';
import styles from '../styles/Form.module.css';

interface FormSectionProps {
  onComplete: (data: CompleteFormData) => void;
}

export function FormSection({ onComplete }: FormSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const totalSteps = stepConfigs.length;

  const { formData, updateFormData, resetFormData } = useFormPersistence<CompleteFormData>();

  const {
    currentStep,
    isFirstStep,
    isLastStep,
    progress,
    goToNext,
    goToPrev,
    canGoNext,
    canGoPrev,
  } = useStepNavigation({
    totalSteps,
    onStepChange: (step, direction) => {
      // Add any step change animations or side effects here
      console.log(`Navigated to step ${step} via ${direction}`);
    },
  });

  // Entrance animation
  useScrollAnimation(
    titleRef,
    { opacity: 1, y: 0 },
    {
      trigger: sectionRef,
      start: 'top 80%',
      once: true,
    }
  );

  const currentStepConfig = stepConfigs[currentStep - 1];

  const handleStepSubmit = (stepData: Partial<CompleteFormData>) => {
    updateFormData(stepData);

    if (isLastStep) {
      // Combine all form data and submit
      const completeData = { ...formData, ...stepData } as CompleteFormData;
      onComplete(completeData);
    } else {
      goToNext();
    }
  };

  const handlePrevious = () => {
    if (canGoPrev) {
      goToPrev();
    }
  };

  return (
    <section ref={sectionRef} className={styles.formSection} id="form" aria-labelledby="form-title">
      <div className={styles.container}>
        <header className={styles.header}>
          <h2
            ref={titleRef}
            id="form-title"
            className={styles.title}
            style={{ fontFamily: 'var(--font-pp-agrandir)' }}
          >
            Get Started
          </h2>
          <p className={styles.subtitle} style={{ fontFamily: 'var(--font-sohne)' }}>
            Just a few quick details to personalize your experience
          </p>
        </header>

        <FormProgress currentStep={currentStep} totalSteps={totalSteps} progress={progress} />

        <div className={styles.formCard}>
          <div className={styles.stepHeader}>
            <h3 className={styles.stepTitle} style={{ fontFamily: 'var(--font-graphik)' }}>
              {currentStepConfig.title}
            </h3>
            <p className={styles.stepDescription} style={{ fontFamily: 'var(--font-sohne)' }}>
              {currentStepConfig.description}
            </p>
          </div>

          <FormStep
            step={currentStep}
            config={currentStepConfig}
            defaultValues={formData}
            onSubmit={handleStepSubmit}
            onPrevious={handlePrevious}
            canGoPrev={canGoPrev}
            isLastStep={isLastStep}
          />

          {/* Form Summary */}
          {Object.keys(formData).length > 0 && (
            <div className={styles.formSummary}>
              <h4 className={styles.summaryTitle}>Your Information:</h4>
              <div className={styles.summaryContent}>
                {Object.entries(formData).map(([key, value]) => {
                  if (!value) return null;

                  const fieldConfig = stepConfigs
                    .flatMap(config => config.fields)
                    .find(field => field.name === key);

                  if (!fieldConfig) return null;

                  return (
                    <div key={key} className={styles.summaryItem}>
                      <span className={styles.summaryLabel}>{fieldConfig.label}:</span>
                      <span className={styles.summaryValue}>{String(value)}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <footer className={styles.footer}>
          <p className={styles.helpText}>
            Need help? Contact our support team at{' '}
            <a
              href="mailto:support@juicebox.com"
              className={styles.helpLink}
              aria-label="Contact support via email"
            >
              support@juicebox.com
            </a>
          </p>
        </footer>
      </div>
    </section>
  );
}
