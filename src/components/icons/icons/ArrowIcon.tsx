import { forwardRef } from 'react';
import { Icon, IconProps } from '../Icon';
import { BaseIconProps } from '../types';

interface ArrowIconProps extends BaseIconProps {
  direction?: 'up' | 'down' | 'left' | 'right';
}

const ArrowIcon = forwardRef<SVGSVGElement, ArrowIconProps>(
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
        <path d="M5 12h14m-7-7 7 7-7 7" />
      </Icon>
    );
  }
);

ArrowIcon.displayName = 'ArrowIcon';

export { ArrowIcon };
export type { ArrowIconProps };
