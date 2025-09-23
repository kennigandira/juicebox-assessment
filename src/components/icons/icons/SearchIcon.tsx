import { forwardRef } from 'react';
import { Icon } from '../Icon';
import { BaseIconProps } from '../types';

const SearchIcon = forwardRef<SVGSVGElement, BaseIconProps>((props, ref) => {
  return (
    <Icon ref={ref} config={{ viewBox: '0 0 24 24', useStroke: true }} {...props}>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </Icon>
  );
});

SearchIcon.displayName = 'SearchIcon';

export { SearchIcon };
