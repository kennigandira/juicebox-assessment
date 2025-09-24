'use client';

import { useRef, useEffect, useState } from 'react';
import { useQueryState, parseAsInteger } from 'nuqs';
import { QueryState } from '@/global/enums/queryState';
import styles from './Form.module.css';

const FORM_STEP_TEXTS = {
  0: "Let's start with the basics. Type in your first name.",
  1: 'How should we contact you? Type in your email address.',
  2: (name: string) =>
    `Thanks, ${name}! Now, it's time to get a reality check.\nThis will take 2-3 minutes.`,
};

export function FormSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formStep] = useQueryState(QueryState.FormStep, parseAsInteger.withDefault(0));
  const [formData, setFormData] = useState<{ firstName?: string; emailAddress?: string }>({});

  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const storedData = localStorage.getItem('formData');
        if (storedData) {
          setFormData(JSON.parse(storedData));
        }
      } catch (error) {
        console.error('Error reading form data from localStorage:', error);
      }
    };

    handleStorageChange();
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const stepText = FORM_STEP_TEXTS[formStep as keyof typeof FORM_STEP_TEXTS];
  const getText = () => {
    if (typeof stepText === 'function') {
      return stepText(formData.firstName || 'there');
    }
    return stepText;
  };

  return (
    <section ref={sectionRef} className={styles.formSection} id="form" aria-labelledby="form-title">
      <p className={styles.subtitle} style={{ fontFamily: 'var(--font-sohne)' }}>
        {getText()}
      </p>
    </section>
  );
}
