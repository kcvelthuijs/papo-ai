import React, { forwardRef } from 'react';

import { IconButton } from '../Elements/IconButton';
import { ArrowUpIcon } from '../Icons/ArrowUp.icon';

export const ArrowUpButton = forwardRef<
  HTMLButtonElement,
  React.ComponentProps<'button'>
>(function ArrowUpButton(props, ref) {
  return (
    <IconButton ref={ref} {...props}>
      <ArrowUpIcon />
    </IconButton>
  );
});
