import ReactMarkdown from 'react-markdown';

import { CopyIcon } from '@workspace/ui';
import type { ChatMessage } from '@workspace/dtotypes';

import RoleAvatar from './Avatar';
import { ChatMessageBubble } from './ChatMessageBubble';
import { ChatBotMessage } from './ChatBotMessage';
import { ChatUserMessage } from './ChatUserMessage';

type Props = {
  message: ChatMessage;
  onSpeakMessage?: (message: ChatMessage) => void;
};

export const ChatMessageItem = ({ message, onSpeakMessage }: Props) => {
  const isAssistant = message.role === 'bot';

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
            className='-ml-4 border shadow-xl border-gray-400 dark:border-gray-200'
            style={{ width: '4rem', height: '4rem' }}
          />
        </div>
      )}

      <ChatMessageBubble role={message.role} onClick={handleSpeak}>
        {isAssistant ? (
          <ChatBotMessage>{message.content}</ChatBotMessage>
        ) : (
          <ChatUserMessage
            content={message.content}
            feedback={message.feedback}
          />
        )}
      </ChatMessageBubble>

      {isAssistant ? (
        <CopyIcon
          className='ml-2 opacity-0 group-hover:opacity-100 cursor-pointer lg:text-2xl'
          onClick={copyText}
        />
      ) : (
        <div className='mx-0'>
          <RoleAvatar
            role='student'
            className='border shadow-xl border-gray-400 dark:border-gray-200'
            style={{
              width: '4rem',
              height: '4rem',
              transform: 'scaleX(-1)',
            }}
          />
        </div>
      )}
    </div>
  );
};
