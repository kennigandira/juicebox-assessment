import { forwardRef } from 'react';
import { Icon } from '../Icon';
import { BaseIconProps } from '../types';

interface ChevronIconProps extends BaseIconProps {
  direction?: 'up' | 'down' | 'left' | 'right';
}

const ChevronIcon = forwardRef<SVGSVGElement, ChevronIconProps>(
  ({ direction = 'right', ...props }, ref) => {
    const rotationMap = {
      up: '-rotate-90',
      down: 'rotate-90',
      left: 'rotate-180',
      right: 'rotate-0',
    };

    const rotation = rotationMap[direction];

    return (
      <Icon
        ref={ref}
        config={{ viewBox: '0 0 24 24', useStroke: true }}
        className={`${rotation} ${props.className || ''}`}
        {...props}
      >
        <path d="m9 18 6-6-6-6" />
      </Icon>
    );
  }
);

ChevronIcon.displayName = 'ChevronIcon';

export { ChevronIcon };
export type { ChevronIconProps };
