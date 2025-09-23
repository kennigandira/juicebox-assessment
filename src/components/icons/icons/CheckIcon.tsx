import { forwardRef } from 'react';
import { Icon } from '../Icon';
import { BaseIconProps } from '../types';

const CheckIcon = forwardRef<SVGSVGElement, BaseIconProps>((props, ref) => {
  return (
    <Icon ref={ref} config={{ viewBox: '0 0 24 24', useStroke: true }} {...props}>
      <path d="M20 6 9 17l-5-5" />
    </Icon>
  );
});

CheckIcon.displayName = 'CheckIcon';

export { CheckIcon };
