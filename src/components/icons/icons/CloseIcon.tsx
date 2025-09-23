import { forwardRef } from 'react';
import { Icon } from '../Icon';
import { BaseIconProps } from '../types';

const CloseIcon = forwardRef<SVGSVGElement, BaseIconProps>((props, ref) => {
  return (
    <Icon ref={ref} config={{ viewBox: '0 0 24 24', useStroke: true }} {...props}>
      <path d="M18 6 6 18M6 6l12 12" />
    </Icon>
  );
});

CloseIcon.displayName = 'CloseIcon';

export { CloseIcon };
