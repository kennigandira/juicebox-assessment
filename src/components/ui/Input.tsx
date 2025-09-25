import { forwardRef, InputHTMLAttributes, Ref, useState, KeyboardEvent, useEffect } from 'react';
import styles from './Input.module.css';
import { ArrowIcon } from '@/components/icons/icons/ArrowIcon';
import clsx from 'clsx';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helpText?: string;
  fullWidth?: boolean;
  inputClassName?: string;
  onEnterSubmit?: (value: string) => void;
  inputRef?: Ref<HTMLInputElement> | undefined;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = 'text',
      error,
      helpText,
      id,
      inputClassName,
      onEnterSubmit,
      inputRef,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState('');

    // Load initial value from localStorage on mount and listen for updates
    useEffect(() => {
      if (props.name && props.value === undefined) {
        const loadFromStorage = () => {
          try {
            const storedData = localStorage.getItem('formData');
            if (storedData && props.name) {
              const formData = JSON.parse(storedData);
              const savedValue = formData[props.name];
              if (savedValue) {
                setInternalValue(savedValue);
              }
            }
          } catch (error) {
            console.error('Error loading form data from localStorage:', error);
          }
        };

        // Load initial value
        loadFromStorage();

        // Listen for storage changes and custom form data updates
        window.addEventListener('storage', loadFromStorage);
        window.addEventListener('formDataUpdated', loadFromStorage);

        return () => {
          window.removeEventListener('storage', loadFromStorage);
          window.removeEventListener('formDataUpdated', loadFromStorage);
        };
      }
    }, [props.name, props.value]);

    // Use controlled value if provided, otherwise use internal state
    const currentValue = props.value !== undefined ? props.value : internalValue;
    const hasValue = typeof currentValue === 'string' && currentValue.trim().length > 0;

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && hasValue) {
        e.preventDefault();
        if (onEnterSubmit) {
          onEnterSubmit(currentValue);
          // Clear the input after submission if uncontrolled
          if (props.value === undefined) {
            setInternalValue('');
          }
        }
      }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;

      // If component is uncontrolled, update internal state
      if (props.value === undefined) {
        setInternalValue(newValue);
      }

      // Always call the onChange prop if provided
      if (props.onChange) {
        props.onChange(e);
      }
    };

    const arrowColor = { color: hasValue ? '#0c0d10' : 'rgba(255, 255, 255, 0.3)' };

    return (
      <div className={className} ref={ref}>
        <input
          {...props}
          ref={inputRef}
          type={type}
          className={clsx(styles.input, error && styles.inputError, inputClassName)}
          id={id}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${id}-error` : helpText ? `${id}-help` : undefined}
          onKeyDown={handleKeyDown}
          onChange={handleInputChange}
          value={currentValue}
        />
        <button
          className={styles.sendButton}
          disabled={!hasValue}
          onClick={() => {
            if (hasValue && onEnterSubmit) {
              onEnterSubmit(currentValue);
              // Clear the input after button click if uncontrolled
              if (props.value === undefined) {
                setInternalValue('');
              }
            }
          }}
          style={{
            background: hasValue ? '#cdaaff' : '#ffffff99',
            cursor: hasValue ? 'pointer' : 'not-allowed',
            opacity: hasValue ? 1 : 0.6,
          }}
        >
          <ArrowIcon style={arrowColor} direction="up" />
        </button>
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
