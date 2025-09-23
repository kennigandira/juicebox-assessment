import { forwardRef } from 'react';
import { Icon } from '../Icon';
import { BaseIconProps } from '../types';

const InfoIcon = forwardRef<SVGSVGElement, BaseIconProps>((props, ref) => {
  return (
    <Icon ref={ref} config={{ viewBox: '0 0 24 24', useStroke: true }} {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="m12 8h.01" />
    </Icon>
  );
});

InfoIcon.displayName = 'InfoIcon';

export { InfoIcon };
