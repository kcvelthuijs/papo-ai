import React, { forwardRef } from 'react';

import { IconButton } from '../Elements/IconButton';
import { PrevIcon } from '../Icons/Prev.icon';

export const PrevButton = forwardRef<
  HTMLButtonElement,
  React.ComponentProps<'button'>
>(function PrevButton(props, ref) {
  return (
    <IconButton ref={ref} {...props}>
      <PrevIcon />
    </IconButton>
  );
});
