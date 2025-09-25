'use client';

import { useState } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { stepSchemas, StepConfig, stepConfigs } from '../schemas/formSchemas';

interface UseFormValidationOptions<T extends Record<string, any>> {
  step: number;
  defaultValues?: Partial<T>;
  onSubmit: (data: T) => void;
}

export function useFormValidation<T extends Record<string, any>>({
  step,
  defaultValues = {},
  onSubmit,
}: UseFormValidationOptions<T>): UseFormReturn<T> & {
  handleSubmitForm: (e: React.FormEvent) => void;
} {
  const schema = stepSchemas[step as keyof typeof stepSchemas];

  if (!schema) {
    throw new Error(`No schema found for step ${step}`);
  }

  const form = useForm<T>({
    resolver: zodResolver(schema as z.ZodSchema<T>),
    defaultValues: defaultValues as T,
    mode: 'onChange',
  });

  const handleSubmitForm = form.handleSubmit(onSubmit);

  return {
    ...form,
    handleSubmitForm,
  };
}

// Hook for form persistence across steps
export function useFormPersistence<T extends Record<string, any>>(initialData?: Partial<T>) {
  const [formData, setFormData] = useState<Partial<T>>(initialData || {});

  const updateFormData = (stepData: Partial<T>) => {
    setFormData(prev => ({ ...prev, ...stepData }));
  };

  const resetFormData = () => {
    setFormData({});
  };

  const getStepData = (step: number): Partial<T> => {
    // Return only the fields relevant to this step
    const stepConfig = stepConfigs.find(config => config.id === step);
    if (!stepConfig) return {};

    const stepFields = stepConfig.fields.map(field => field.name);
    return Object.keys(formData)
      .filter(key => stepFields.includes(key))
      .reduce((obj, key) => {
        obj[key] = formData[key];
        return obj;
      }, {} as Partial<T>);
  };

  return {
    formData,
    updateFormData,
    resetFormData,
    getStepData,
  };
}
