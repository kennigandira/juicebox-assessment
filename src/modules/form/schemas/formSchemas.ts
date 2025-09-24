import { z } from 'zod';

// Individual step schemas
export const step1Schema = z.object({
  firstName: z
    .string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters')
    .regex(
      /^[a-zA-Z\s'-]+$/,
      'First name can only contain letters, spaces, hyphens, and apostrophes'
    ),
});

export const step2Schema = z.object({
  email: z
    .string()
    .email('Please enter a valid email address')
    .min(5, 'Email must be at least 5 characters')
    .max(100, 'Email must be less than 100 characters'),
});

// Add more steps as needed
export const step3Schema = z.object({
  company: z
    .string()
    .min(2, 'Company name must be at least 2 characters')
    .max(100, 'Company name must be less than 100 characters')
    .optional(),
  role: z
    .string()
    .min(2, 'Role must be at least 2 characters')
    .max(50, 'Role must be less than 50 characters')
    .optional(),
});

// Complete form schema
export const completeFormSchema = step1Schema.merge(step2Schema).merge(step3Schema);

// Type definitions
export type Step1Data = z.infer<typeof step1Schema>;
export type Step2Data = z.infer<typeof step2Schema>;
export type Step3Data = z.infer<typeof step3Schema>;
export type CompleteFormData = z.infer<typeof completeFormSchema>;

// Schema map for dynamic validation
export const stepSchemas = {
  1: step1Schema,
  2: step2Schema,
  3: step3Schema,
} as const;

// Step configurations
export interface StepConfig {
  id: number;
  title: string;
  description: string;
  fields: Array<{
    name: string;
    type: 'text' | 'email' | 'select' | 'textarea';
    label: string;
    placeholder?: string;
    required?: boolean;
    options?: Array<{ label: string; value: string }>;
  }>;
}

export const stepConfigs: StepConfig[] = [
  {
    id: 1,
    title: 'Personal Information',
    description: "Let's start with your name",
    fields: [
      {
        name: 'firstName',
        type: 'text',
        label: 'First Name',
        placeholder: 'Enter your first name',
        required: true,
      },
    ],
  },
  {
    id: 2,
    title: 'Contact Details',
    description: 'How can we reach you?',
    fields: [
      {
        name: 'email',
        type: 'email',
        label: 'Email Address',
        placeholder: 'Enter your email address',
        required: true,
      },
    ],
  },
  {
    id: 3,
    title: 'Professional Information',
    description: 'Tell us about your work (optional)',
    fields: [
      {
        name: 'company',
        type: 'text',
        label: 'Company',
        placeholder: 'Enter your company name',
        required: false,
      },
      {
        name: 'role',
        type: 'text',
        label: 'Role',
        placeholder: 'Enter your role/position',
        required: false,
      },
    ],
  },
];
