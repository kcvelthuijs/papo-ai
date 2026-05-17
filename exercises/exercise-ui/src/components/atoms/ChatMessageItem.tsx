import ReactMarkdown from 'react-markdown';

import { CopyIcon } from '@workspace/ui';
import type { ChatMessage } from '@exercises/logic';

type Props = {
  message: ChatMessage;
  onSpeakMessage?: (message: ChatMessage) => void;
};

export const ChatMessageItem = ({ message, onSpeakMessage }: Props) => {
  const isAssistant = message.role === 'assistant';

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
      <div
        className={`max-w-[80%] p-2 rounded-md border cursor-pointer
        ${
          isAssistant
            ? 'bg-gray-100 border-gray-300 text-black'
            : 'bg-blue-700 border-blue-900 text-white'
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
    </div>
  );
};
