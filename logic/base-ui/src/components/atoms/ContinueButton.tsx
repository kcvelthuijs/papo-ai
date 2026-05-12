import React, { forwardRef } from 'react';

export const ContinueButton = forwardRef<
  HTMLButtonElement,
  React.ComponentProps<'button'>
>(function ContinueButton(props, ref) {
  return (
    <button
      ref={ref}
      {...props}
      className='border-1 px-2 py-1 rounded-sm border-gray-600 text-black bg-white hover:bg-gray-400 hover:border-gray-800 hover:text-white'
    />
  );
});
