import React, { forwardRef } from 'react';

import { IconButton } from '../Elements/IconButton';
import { CloseIcon } from '../Icons/Close.icon';

export const CloseButton = forwardRef<
  HTMLButtonElement,
  React.ComponentProps<'button'>
>(function CloseButton(props, ref) {
  return (
    <IconButton ref={ref} {...props}>
      <CloseIcon />
    </IconButton>
  );
});
