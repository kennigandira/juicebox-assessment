import { forwardRef, SVGProps } from 'react';
import { BaseIconProps, IconConfig } from './types';
import clsx from 'clsx';

interface IconProps extends BaseIconProps, Omit<SVGProps<SVGSVGElement>, keyof BaseIconProps> {
  children: React.ReactNode;
  config?: IconConfig;
}

const ICON_SIZES = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
} as const;

const Icon = forwardRef<SVGSVGElement, IconProps>(
  (
    {
      size = 'md',
      color = 'currentColor',
      className,
      strokeWidth = 2,
      variant = 'default',
      'aria-label': ariaLabel,
      'aria-hidden': ariaHidden = !ariaLabel,
      role = ariaLabel ? 'img' : 'presentation',
      onClick,
      'data-testid': testId,
      children,
      config,
      ...props
    },
    ref
  ) => {
    const iconSize = typeof size === 'number' ? size : ICON_SIZES[size];

    const baseClasses = 'inline-block flex-shrink-0';
    const variantClasses = {
      default: '',
      spin: 'animate-spin',
      pulse: 'animate-pulse',
    };

    const interactiveClasses = onClick ? 'cursor-pointer' : '';

    return (
      <svg
        ref={ref}
        width={iconSize}
        height={iconSize}
        viewBox={config?.viewBox || '0 0 24 24'}
        fill={config?.useStroke ? 'none' : color}
        stroke={config?.useStroke ? color : 'none'}
        strokeWidth={config?.useStroke ? strokeWidth : undefined}
        strokeLinecap={config?.useStroke ? 'round' : undefined}
        strokeLinejoin={config?.useStroke ? 'round' : undefined}
        className={clsx(baseClasses, variantClasses[variant], interactiveClasses, className)}
        aria-label={ariaLabel}
        aria-hidden={ariaHidden}
        role={role}
        onClick={onClick}
        data-testid={testId}
        {...props}
      >
        {children}
      </svg>
    );
  }
);

Icon.displayName = 'Icon';

export { Icon };
export type { IconProps };
