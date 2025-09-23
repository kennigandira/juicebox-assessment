'use client';

import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { gsap } from 'gsap';
import { Button, Input } from '@/components/ui';

// Form validation schemas
const step1Schema = z.object({
  firstName: z
    .string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters'),
});

const step2Schema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

// const completeSchema = step1Schema.merge(step2Schema)

type Step1Data = z.infer<typeof step1Schema>;
type Step2Data = z.infer<typeof step2Schema>;
type FormData = Step1Data & Step2Data;

interface MultiStepFormProps {
  onComplete: (data: FormData) => void;
}

export function MultiStepForm({ onComplete }: MultiStepFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const totalSteps = 2;

  // Step 1 form
  const step1Form = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      firstName: formData.firstName || '',
    },
  });

  // Step 2 form
  const step2Form = useForm<Step2Data>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      email: formData.email || '',
    },
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        [titleRef.current, formRef.current],
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    // Animate progress bar
    if (progressRef.current) {
      gsap.to(progressRef.current, {
        width: `${(currentStep / totalSteps) * 100}%`,
        duration: 0.5,
        ease: 'power2.out',
      });
    }

    // Animate form transition
    if (formRef.current) {
      gsap.fromTo(
        formRef.current.querySelectorAll('.form-field'),
        { opacity: 0, x: 20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
        }
      );
    }
  }, [currentStep]);

  const handleStep1Submit = (data: Step1Data) => {
    setFormData(prev => ({ ...prev, ...data }));
    setCurrentStep(2);
  };

  const handleStep2Submit = async (data: Step2Data) => {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const completeData = { ...formData, ...data } as FormData;
    setFormData(completeData);

    setIsSubmitting(false);
    onComplete(completeData);
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return 'Personal Information';
      case 2:
        return 'Contact Details';
      default:
        return 'Form';
    }
  };

  const getStepDescription = () => {
    switch (currentStep) {
      case 1:
        return "Let's start with your name";
      case 2:
        return 'How can we reach you?';
      default:
        return '';
    }
  };

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center px-4 py-20 bg-[#0a0b14]"
      id="form"
    >
      <div className="max-w-md mx-auto w-full">
        <div className="text-center mb-8">
          <h2
            ref={titleRef}
            className="text-3xl md:text-4xl font-bold text-white mb-4"
            style={{ fontFamily: 'var(--font-pp-agrandir)' }}
          >
            Get Started
          </h2>
          <p className="text-lg text-white/80" style={{ fontFamily: 'var(--font-sohne)' }}>
            Just a few quick details to personalize your experience
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-white/60 mb-2">
            <span>
              Step {currentStep} of {totalSteps}
            </span>
            <span>{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2">
            <div
              ref={progressRef}
              className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
          <div className="mb-6">
            <h3
              className="text-xl font-semibold text-white mb-2"
              style={{ fontFamily: 'var(--font-graphik)' }}
            >
              {getStepTitle()}
            </h3>
            <p className="text-white/70" style={{ fontFamily: 'var(--font-sohne)' }}>
              {getStepDescription()}
            </p>
          </div>

          {/* Step 1 - First Name */}
          {currentStep === 1 && (
            <form
              ref={formRef}
              onSubmit={step1Form.handleSubmit(handleStep1Submit)}
              className="space-y-6"
            >
              <div className="form-field">
                <Input
                  label="First Name"
                  placeholder="Enter your first name"
                  required
                  fullWidth
                  {...step1Form.register('firstName')}
                  error={step1Form.formState.errors.firstName?.message}
                />
              </div>

              <div className="flex justify-end space-x-4">
                <Button type="submit" disabled={!step1Form.formState.isValid} className="px-6 py-2">
                  Next Step
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Button>
              </div>
            </form>
          )}

          {/* Step 2 - Email */}
          {currentStep === 2 && (
            <form
              ref={formRef}
              onSubmit={step2Form.handleSubmit(handleStep2Submit)}
              className="space-y-6"
            >
              <div className="form-field">
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="Enter your email address"
                  required
                  fullWidth
                  {...step2Form.register('email')}
                  error={step2Form.formState.errors.email?.message}
                />
              </div>

              <div className="flex justify-between space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrevStep}
                  className="px-6 py-2"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
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
                <Button
                  type="submit"
                  loading={isSubmitting}
                  disabled={!step2Form.formState.isValid || isSubmitting}
                  className="px-6 py-2"
                >
                  {isSubmitting ? 'Submitting...' : 'Complete'}
                </Button>
              </div>
            </form>
          )}

          {/* Form Summary */}
          <div className="mt-6 pt-6 border-t border-white/20">
            <h4 className="text-sm font-medium text-white/80 mb-3">Your Information:</h4>
            <div className="space-y-2 text-sm text-white/60">
              {formData.firstName && (
                <div className="flex justify-between">
                  <span>First Name:</span>
                  <span className="font-medium text-white/80">{formData.firstName}</span>
                </div>
              )}
              {formData.email && (
                <div className="flex justify-between">
                  <span>Email:</span>
                  <span className="font-medium text-white/80">{formData.email}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Help Text */}
        <div className="text-center mt-6">
          <p className="text-sm text-white/50">
            Need help? Contact our support team at{' '}
            <a href="mailto:support@juicebox.com" className="text-purple-400 hover:underline">
              support@juicebox.com
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
