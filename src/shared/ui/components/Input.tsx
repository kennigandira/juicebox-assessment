import { forwardRef, InputHTMLAttributes, Ref } from 'react';
import { cn } from '@/lib/utils';
import styles from './Input.module.css';
import { ArrowIcon } from '@/components/icons/icons/ArrowIcon';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helpText?: string;
  fullWidth?: boolean;
  inputClassName?: string;
  onSubmitInput?: (value: string) => void;
  inputRef?: Ref<HTMLInputElement> | undefined;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = 'text',
      label,
      error,
      helpText,
      fullWidth = false,
      id,
      inputClassName,
      onSubmitInput,
      inputRef,
      ...props
    },
    ref
  ) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
    const handleSubmit = (value: string) => {
      if (onSubmitInput) onSubmitInput(value);
    };

    return (
      <div className={className} ref={ref}>
        {label && (
          <label htmlFor={inputId} className={styles.label}>
            {label}
            {props.required && <span className={styles.required}>*</span>}
          </label>
        )}

        <input
          ref={inputRef}
          type={type}
          className={cn(styles.input, error && styles.inputError, inputClassName)}
          id={inputId}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${inputId}-error` : helpText ? `${inputId}-help` : undefined}
          {...props}
        />
        <button className={styles.sendButton}>
          <ArrowIcon style={{ color: 'rgba(255, 255, 255, 0.3)' }} direction="up" />
        </button>
      </div>
    );
  }
);

export { Input };
