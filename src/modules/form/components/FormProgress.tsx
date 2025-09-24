'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import styles from '../styles/Form.module.css';

interface FormProgressProps {
  currentStep: number;
  totalSteps: number;
  progress: number;
}

export function FormProgress({ currentStep, totalSteps, progress }: FormProgressProps) {
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (progressFillRef.current) {
      gsap.to(progressFillRef.current, {
        width: `${progress}%`,
        duration: 0.5,
        ease: 'power2.out',
      });
    }
  }, [progress]);

  return (
    <div
      className={styles.progressContainer}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={progress}
    >
      <div className={styles.progressHeader}>
        <span className={styles.progressText} aria-live="polite">
          Step {currentStep} of {totalSteps}
        </span>
        <span className={styles.progressPercentage} aria-live="polite">
          {Math.round(progress)}% Complete
        </span>
      </div>

      <div ref={progressBarRef} className={styles.progressBar} aria-hidden="true">
        <div
          ref={progressFillRef}
          className={styles.progressFill}
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Step indicators */}
      <div className={styles.stepIndicators} role="navigation" aria-label="Form steps">
        {Array.from({ length: totalSteps }, (_, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;

          return (
            <div
              key={stepNumber}
              className={`${styles.stepIndicator} ${
                isActive ? styles.stepIndicatorActive : ''
              } ${isCompleted ? styles.stepIndicatorCompleted : ''}`}
              aria-label={`Step ${stepNumber}${isActive ? ' (current)' : ''}${
                isCompleted ? ' (completed)' : ''
              }`}
            >
              <div className={styles.stepNumber}>
                {isCompleted ? (
                  <svg
                    className={styles.checkIcon}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  stepNumber
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
