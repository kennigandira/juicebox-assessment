import { forwardRef, InputHTMLAttributes } from 'react';
import styles from './Input.module.css';
import clsx from 'clsx';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helpText?: string;
  fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', label, error, helpText, fullWidth = false, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className={clsx(styles.container, fullWidth && styles.containerFullWidth)}>
        {label && (
          <label htmlFor={inputId} className={styles.label}>
            {label}
            {props.required && <span className={styles.required}>*</span>}
          </label>
        )}

        <input
          type={type}
          className={clsx(styles.input, error && styles.inputError, className)}
          ref={ref}
          id={inputId}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${inputId}-error` : helpText ? `${inputId}-help` : undefined}
          {...props}
        />

        {error && (
          <div
            id={`${inputId}-error`}
            className={styles.errorMessage}
            role="alert"
            aria-live="polite"
          >
            {error}
          </div>
        )}

        {helpText && !error && (
          <div id={`${inputId}-help`} className={styles.helpText}>
            {helpText}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
