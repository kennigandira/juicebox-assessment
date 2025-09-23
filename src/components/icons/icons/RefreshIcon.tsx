import { forwardRef } from 'react';
import { Icon } from '../Icon';
import { BaseIconProps } from '../types';

const RefreshIcon = forwardRef<SVGSVGElement, BaseIconProps>((props, ref) => {
  return (
    <Icon ref={ref} config={{ viewBox: '0 0 20 20', useStroke: true }} {...props}>
      <path d="M3.33325 3.33325V7.49992H3.81785M16.615 9.16659C16.2049 5.87799 13.3996 3.33325 9.99992 3.33325C7.2021 3.33325 4.80683 5.05673 3.81785 7.49992M3.81785 7.49992H7.49992M16.6666 16.6666V12.4999H16.182M16.182 12.4999C15.193 14.9431 12.7977 16.6666 9.99992 16.6666C6.60024 16.6666 3.79491 14.1218 3.38483 10.8333M16.182 12.4999H12.4999" />
    </Icon>
  );
});

RefreshIcon.displayName = 'RefreshIcon';

export { RefreshIcon };
