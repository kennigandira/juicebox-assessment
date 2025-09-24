export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;

export type IconColor = 'currentColor' | 'inherit' | string;

export type IconVariant = 'default' | 'spin' | 'pulse';

export interface BaseIconProps {
  /** Size of the icon. Can be a preset string or custom number (pixels) */
  size?: IconSize;
  /** Color of the icon. Defaults to currentColor */
  color?: IconColor;
  /** Additional CSS classes */
  className?: string;
  /** Stroke width for stroke-based icons */
  strokeWidth?: number | string;
  /** Animation variant */
  variant?: IconVariant;
  /** Accessibility label */
  'aria-label'?: string;
  /** Whether the icon is decorative only */
  'aria-hidden'?: boolean;
  /** Role attribute */
  role?: string;
  /** Click handler */
  onClick?: () => void;
  /** Test ID for testing */
  'data-testid'?: string;
  style?: CSSStyleSheet;
}

export interface IconConfig {
  /** Default viewBox for the icon */
  viewBox: string;
  /** Default fill rule */
  fillRule?: 'nonzero' | 'evenodd';
  /** Whether the icon uses stroke instead of fill */
  useStroke?: boolean;
}
