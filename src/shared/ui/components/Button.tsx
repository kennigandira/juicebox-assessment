import { forwardRef, ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { SpinnerIcon } from '@/components/icons';
import styles from './Button.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'hero' | 'purple' | 'purple-outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  fullWidth?: boolean;
  /** Icon to display before text */
  icon?: React.ReactNode;
  /** Icon to display after text */
  endIcon?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      loading = false,
      fullWidth = false,
      disabled,
      children,
      icon,
      endIcon,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        className={cn(
          styles.button,
          styles[variant],
          styles[size],
          fullWidth && styles.fullWidth,
          loading && styles.loading,
          className
        )}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        aria-busy={loading}
        ref={ref}
        {...props}
      >
        {/* Loading spinner with proper accessibility */}
        {loading && (
          <>
            <SpinnerIcon
              size={size === 'sm' ? 'xs' : size === 'lg' ? 'md' : 'sm'}
              className="mr-2"
              aria-hidden={true}
            />
            <span className="sr-only">Loading...</span>
          </>
        )}

        {/* Leading icon */}
        {!loading && icon && (
          <span className="mr-2 flex-shrink-0" aria-hidden="true">
            {icon}
          </span>
        )}

        {/* Button content */}
        <span className={cn('flex items-center gap-2', loading && 'opacity-70')}>{children}</span>

        {/* Trailing icon */}
        {!loading && endIcon && (
          <span className="ml-2 flex-shrink-0" aria-hidden="true">
            {endIcon}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
