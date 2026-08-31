import type { ChatRole } from '@workspace/dtotypes';
import type { ReactNode } from 'react';

type Props = {
  role: ChatRole;
  children: ReactNode;
  onClick?: () => void;
};

export const ChatMessageBubble = ({ role, children, onClick }: Props) => {
  const isAssistant = role === 'bot';
  return (
    <div
      className={`max-w-[80%] p-2 rounded-md border cursor-pointer xl:text-lg
        ${
          isAssistant
            ? 'bg-gray-100 border-gray-300 text-black dark:bg-gray-700 dark:border-gray-500 dark:text-gray-200'
            : 'bg-blue-200 border-blue-900 text-black dark:bg-blue-900 dark:border-gray-500 dark:text-gray-200'
        }`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
