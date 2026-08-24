import { useLayoutEffect, useRef } from 'react';
import type { ChatMessage } from '@workspace/dtotypes';
import { ChatMessageItem } from './ChatMessageItem';

type Props = {
  messages: ChatMessage[];
  onSpeakMessage?: (message: ChatMessage) => void;
};

export const ChatMessageList = ({ messages, onSpeakMessage }: Props) => {
  const lastRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    console.log('ChatMessageList', 'scroll');
    lastRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end'
    });
  }, [messages, messages.length]);

  return (
    <div className='flex flex-col gap-2 py-2'>
      {messages.map((message, index) => (
        <div
          key={message.id ?? index}
          ref={index === messages.length - 1 ? lastRef : null}
        >
          <ChatMessageItem message={message} onSpeakMessage={onSpeakMessage} />
        </div>
      ))}
    </div>
  );
};
