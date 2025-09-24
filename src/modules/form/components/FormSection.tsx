'use client';

import { useRef } from 'react';
import { useStepNavigation } from '@/shared/navigation';
import { useFormPersistence } from '../hooks/useFormValidation';
import { CompleteFormData, stepConfigs } from '../schemas/formSchemas';
import { useScrollAnimation } from '@/shared/animations';
import styles from './Form.module.css';

export function FormSection() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} className={styles.formSection} id="form" aria-labelledby="form-title">
      <p className={styles.subtitle} style={{ fontFamily: 'var(--font-sohne)' }}>
        Let’s start with the basics. Type in your first name.
      </p>
    </section>
  );
}
