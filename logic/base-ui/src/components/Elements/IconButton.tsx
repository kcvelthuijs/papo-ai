import React, { forwardRef, ReactNode } from 'react';

import { Button } from '../shadcn/button';

type IconButtonProps = React.ComponentProps<'button'> & {
  children: ReactNode;
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton({ children, className, ...props }, ref) {
    return (
      <Button
        ref={ref}
        {...props}
        className={`
          border px-2 py-1 rounded-sm 
          bg-white text-gray-600 border-gray-400 hover:bg-gray-400 hover:border-gray-800 hover:text-white
          dark:bg-gray-600 
          dark:text-gray-300 
          dark:border-gray-400 
          dark:hover:bg-gray-200 
          dark:hover:text-gray-800 
          dark:hover:border-gray-800
          ${className ?? ''}
        `}
      >
        {children}
      </Button>
    );
  },
);
