import { useEffect, useState } from 'react';

import { useDialogStore } from '@workspace/controllers';
import { CardLayout, Spinner } from '@workspace/ui';
import type { ChatExerciseProps } from '@exercises/logic';

import { ChatMessageList } from '../../../Components/Atoms/ChatMessageList';
import { ChatInput } from '../../../Components/Atoms/ChatInput';
import { AudioPlayer } from '../../../Components/Atoms/AudioPlayer';
import type { ChatMessage } from '@workspace/dtotypes';

export function CheckChatTest({
  exercise,
  onSubmit,
  onComplete,
  handleAudio,
}: ChatExerciseProps) {
  const { messages, isBusy, isErr, errorMessage } = useDialogStore();
  const [isPlaying, setPlaying] = useState<boolean>(false);

  useEffect(() => {
    // speel de eerste melding
    if (messages && messages.length == 1) {
      startAudio(messages[0]!);
    }
  }, [messages]);

  if (isErr) {
    return <div className='p-4 text-red-600'>{errorMessage}</div>;
  }

  const endAudio = () => {
    setPlaying(false);
  };

  const startAudio = async (msg: ChatMessage) => {
    const voice: string = msg.role === 'bot' ? exercise.voice.voice : 'ash';
    if (handleAudio !== undefined) {
      setPlaying(true);
      await handleAudio(msg.content, { voice }, endAudio);
    }
  };

  const handleSubmit = async (text: string) => {
    useDialogStore.getState().sayMessage = startAudio;
    useDialogStore.getState().addMessage(text);
  };

  return (
    <CardLayout
      title={exercise.title}
      content={
        <>
          <ChatMessageList messages={messages} onSpeakMessage={startAudio} />
          {isBusy && <Spinner className='h-10 w-10' />}
        </>
      }
      footer=<>
        <AudioPlayer />
        {!isPlaying && (
          <ChatInput onSubmit={handleSubmit} isDisabled={isBusy} />
        )}
      </>
      takesFullScreen
    />
  );
}
