'use client';

import { useRef, useEffect } from 'react';
import { Button, Input, Select } from '@/shared/ui';
import { useFormValidation } from '../hooks/useFormValidation';
import { StepConfig, CompleteFormData } from '../schemas/formSchemas';
import { useGSAPAnimation } from '@/shared/animations';
import { gsap } from 'gsap';
import styles from '../styles/Form.module.css';

interface FormStepProps {
  step: number;
  config: StepConfig;
  defaultValues: Partial<CompleteFormData>;
  onSubmit: (data: Partial<CompleteFormData>) => void;
  onPrevious?: () => void;
  canGoPrev?: boolean;
  isLastStep?: boolean;
}

export function FormStep({
  step,
  config,
  defaultValues,
  onSubmit,
  onPrevious,
  canGoPrev = false,
  isLastStep = false,
}: FormStepProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const fieldsRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmitForm,
    formState: { errors, isValid, isSubmitting },
    watch,
  } = useFormValidation({
    step,
    defaultValues,
    onSubmit,
  });

  // Form field animations
  useGSAPAnimation(
    () => {
      if (!fieldsRef.current) return;

      const fields = fieldsRef.current.querySelectorAll('.form-field');
      if (fields.length === 0) return;

      // Set initial state
      gsap.set(fields, { opacity: 0, x: 20 });

      // Animate entrance
      const tl = gsap.timeline();
      tl.to(fields, {
        opacity: 1,
        x: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out',
      });

      return tl;
    },
    { scope: formRef, dependencies: [step] }
  );

  const renderField = (field: StepConfig['fields'][0]) => {
    const fieldProps = {
      ...register(field.name as keyof CompleteFormData),
      label: field.label,
      placeholder: field.placeholder,
      required: field.required,
      error: errors[field.name as keyof CompleteFormData]?.message,
      'aria-invalid': !!errors[field.name as keyof CompleteFormData],
      'aria-describedby': errors[field.name as keyof CompleteFormData]
        ? `${field.name}-error`
        : undefined,
    };

    switch (field.type) {
      case 'select':
        return <Select key={field.name} {...fieldProps} options={field.options || []} />;
      case 'textarea':
        return <textarea key={field.name} {...fieldProps} className={styles.textarea} rows={4} />;
      default:
        return <Input key={field.name} type={field.type} {...fieldProps} fullWidth />;
    }
  };

  // Watch form values to enable/disable submit button
  const formValues = watch();
  const hasRequiredFields = config.fields
    .filter(field => field.required)
    .every(field => formValues[field.name as keyof CompleteFormData]);

  const getSubmitButtonText = () => {
    if (isSubmitting) return 'Submitting...';
    if (isLastStep) return 'Complete';
    return 'Next Step';
  };

  return (
    <form ref={formRef} onSubmit={handleSubmitForm} className={styles.form} noValidate>
      <div ref={fieldsRef} className={styles.fields}>
        {config.fields.map(field => (
          <div key={field.name} className={`form-field ${styles.field}`}>
            {renderField(field)}
          </div>
        ))}
      </div>

      <div className={styles.actions}>
        {canGoPrev && onPrevious && (
          <Button
            type="button"
            variant="outline"
            onClick={onPrevious}
            className={styles.prevButton}
            aria-label="Go to previous step"
          >
            <svg
              className={styles.buttonIcon}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Previous
          </Button>
        )}

        <Button
          type="submit"
          loading={isSubmitting}
          disabled={!isValid || !hasRequiredFields || isSubmitting}
          className={styles.nextButton}
          aria-label={isLastStep ? 'Complete form submission' : 'Go to next step'}
        >
          {getSubmitButtonText()}
          {!isLastStep && (
            <svg
              className={styles.buttonIcon}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          )}
        </Button>
      </div>

      {/* Validation errors summary for screen readers */}
      {Object.keys(errors).length > 0 && (
        <div
          className={styles.errorSummary}
          role="alert"
          aria-live="polite"
          aria-label="Form validation errors"
        >
          <h4 className={styles.errorTitle}>Please fix the following errors:</h4>
          <ul className={styles.errorList}>
            {Object.entries(errors).map(([field, error]) => (
              <li key={field} id={`${field}-error`}>
                {String(error.message)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </form>
  );
}
