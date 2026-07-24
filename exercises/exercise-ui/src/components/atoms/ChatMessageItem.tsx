import ReactMarkdown from 'react-markdown';

import { CopyIcon } from '@workspace/ui';
import type { ChatMessage } from '@workspace/dtotypes';
import RoleAvatar from './Avatar';

type Props = {
  message: ChatMessage;
  onSpeakMessage?: (message: ChatMessage) => void;
};

export const ChatMessageItem = ({ message, onSpeakMessage }: Props) => {
  const isAssistant = message.role === 'bot';
  const isStudent = message.role === 'user';

  const handleSpeak = () => {
    onSpeakMessage?.(message);
  };

  const copyText = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(message.content);
  };

  return (
    <div
      className={`flex ${isAssistant ? 'justify-start' : 'justify-end'} group`}
    >
      {isAssistant && (
        <div className='mr-4'>
          <RoleAvatar
            role='bot'
            className='-ml-4 border-1 shadow-xl border-gray-400 dark:border-gray-200'
            style={{ width: '4rem', height: '4rem' }}
          />
        </div>
      )}
      <div
        className={`max-w-[80%] p-2 rounded-md border cursor-pointer xl:text-lg
        ${
          isAssistant
            ? 'bg-gray-100 border-gray-300 text-black dark:bg-gray-700 dark:border-gray-500 dark:text-gray-200'
            : 'bg-blue-200 border-blue-900 text-black dark:bg-blue-900 dark:border-gray-500 dark:text-gray-200'
        }`}
        onClick={handleSpeak}
      >
        <ReactMarkdown>{message.content}</ReactMarkdown>
      </div>

      {isAssistant && (
        <CopyIcon
          className='ml-2 opacity-0 group-hover:opacity-100 cursor-pointer'
          onClick={copyText}
        />
      )}

      {isStudent && (
        <>
          <div className='mx-0'>
            <RoleAvatar
              role='student'
              className='border-1 shadow-xl border-gray-400 dark:border-gray-200'
              style={{
                width: '4rem',
                height: '4rem',
                transform: 'scaleX(-1)',
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};
