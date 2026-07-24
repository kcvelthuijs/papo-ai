import React, { forwardRef } from 'react';

import { IconButton } from '../Elements/IconButton';
import { NextIcon } from '../Icons/Next.icon';

export const NextButton = forwardRef<
  HTMLButtonElement,
  React.ComponentProps<'button'>
>(function NextButton(props, ref) {
  return (
    <IconButton ref={ref} {...props}>
      <NextIcon />
    </IconButton>
  );
});
