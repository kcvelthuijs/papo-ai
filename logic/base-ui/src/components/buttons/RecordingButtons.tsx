import React, { forwardRef } from 'react';

import { StartRecordingIcon, StopRecordingIcon } from '../Icons/Recording.icon';
import { Button } from '../shadcn/button';
import { IconButton } from '../Elements/IconButton';

export const StartRecordingButton = forwardRef<
  HTMLButtonElement,
  React.ComponentProps<'button'>
>(function StartRecordingButton(props, ref) {
  return (
    <IconButton ref={ref} {...props}>
      <StartRecordingIcon />
    </IconButton>
  );
});

export const StopRecordingButton = forwardRef<
  HTMLButtonElement,
  React.ComponentProps<'button'>
>(function CloseButton(props, ref) {
  return (
    <Button
      ref={ref}
      {...props}
      className='border-1 px-2 py-1 rounded-sm border-gray-400 text-gray-600 bg-white hover:bg-gray-400 hover:border-gray-800 hover:text-white 
      dark:bg-gray-600 dark:text-gray-300 dark:border-gray-400 dark:hover:bg-gray-200 dark:hover:text-gray-800 dark:hover:border-gray-800'
    >
      <StopRecordingIcon />
    </Button>
  );
});
