import { forwardRef, SelectHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import styles from './Select.module.css';

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helpText?: string;
  options: SelectOption[];
  placeholder?: string;
  fullWidth?: boolean;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    { className, label, error, helpText, options, placeholder, fullWidth = false, id, ...props },
    ref
  ) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className={cn(styles.container, fullWidth && styles.containerFullWidth)}>
        {label && (
          <label htmlFor={selectId} className={cn(styles.label, styles.labelDark)}>
            {label}
            {props.required && <span className={styles.required}>*</span>}
          </label>
        )}

        <select
          className={cn(styles.select, styles.selectDark, error && styles.selectError, className)}
          ref={ref}
          id={selectId}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${selectId}-error` : helpText ? `${selectId}-help` : undefined}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map(option => (
            <option key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </option>
          ))}
        </select>

        {error && (
          <div
            id={`${selectId}-error`}
            className={cn(styles.errorMessage, styles.errorMessageDark)}
            role="alert"
            aria-live="polite"
          >
            {error}
          </div>
        )}

        {helpText && !error && (
          <div id={`${selectId}-help`} className={cn(styles.helpText, styles.helpTextDark)}>
            {helpText}
          </div>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

export { Select, type SelectOption };
