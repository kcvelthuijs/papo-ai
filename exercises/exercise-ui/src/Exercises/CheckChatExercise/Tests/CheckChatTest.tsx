import { useEffect, useState } from 'react';

import { useDialogStore, useLessonStore } from '@workspace/controllers';
import { CardLayout, Spinner } from '@workspace/ui';
import { createProgress, type ChatExerciseProps } from '@exercises/logic';

import { ChatMessageList } from '../../../Components/Atoms/ChatMessageList';
import { ChatInput } from '../../../Components/Atoms/ChatInput';
import { AudioPlayer } from '../../../Components/Atoms/AudioPlayer';
import {
  type ChatPhrases,
  type ChatStates,
  type ChatExerciseFeedback,
  type ChatMessage,
} from '@workspace/dtotypes';

import { SceneCompletionState } from '../Layouts/SceneCompletionState';

export function CheckChatTest({
  exercise,
  onSubmit,
  onComplete,
  handleAudio,
}: ChatExerciseProps) {
  const { messages, isBusy, isErr, errorMessage } = useDialogStore();
  const { question } = useLessonStore();

  const [isPlaying, setPlaying] = useState<boolean>(false);
  const [phrases, setPhrases] = useState<ChatPhrases>({});
  const [states, setStates] = useState<ChatStates>({});

  if (isErr) {
    return <div className='p-4 text-red-600'>{errorMessage}</div>;
  }

  useEffect(() => {
    const progress = createProgress(exercise.scenes[0]);
    setPhrases(progress.phrases);
    setStates(progress.states);
  }, [exercise]);

  useEffect(() => {
    // speel de eerste melding
    if (messages && messages.length == 1) {
      startAudio(messages[0]!);
    }
  }, [messages, messages.length]);

  useEffect(() => {
    const nextScenePrompt = exercise.scenes[question]?.prompt;
    useDialogStore.getState().assignment =
      nextScenePrompt ?? 'continue your conversation';
  }, [question]);

  // -------------------------
  // HANDLE SUBMIT
  // -------------------------
  const handleSubmit = async (text: string) => {
    const message = messages[messages.length - 1]?.content ?? '';
    const result: ChatExerciseFeedback = await onSubmit({
      message,
      response: text,
      phrases,
      states,
    });

    // Set the new phrases and states
    setPhrases(result.progress.phrases);
    setStates(result.progress.states);

    if (result.nextAction == 'next step') {
    }
    // Add input from user to the dialogue
    useDialogStore.getState().sayMessage = startAudio;
    useDialogStore.getState().addMessage(text, result.feedback);
  };

  // -------------------------
  // HANDLE AUDIO
  // -------------------------
  const startAudio = async (msg: ChatMessage) => {
    const voice: string = msg.role === 'bot' ? exercise.voice.voice : 'ash';
    if (handleAudio !== undefined) {
      setPlaying(true);
      await handleAudio(msg.content, { voice }, endAudio);
    }
  };
  const endAudio = () => {
    setPlaying(false);
  };

  // -------------------------
  // QUIT
  // -------------------------
  function quit() {
    onComplete('quit');
  }

  return (
    <CardLayout
      title={exercise.title}
      onClose={quit}
      content={
        <>
          <ChatMessageList messages={messages} onSpeakMessage={startAudio} />
          {isBusy && <Spinner className='h-10 w-10' />}
        </>
      }
      footer=<>
        {isPlaying ? (
          <AudioPlayer />
        ) : (
          <>
            <SceneCompletionState phrases={phrases} states={states} />
            <ChatInput onSubmit={handleSubmit} isDisabled={isBusy} />
          </>
        )}
      </>
      takesFullScreen
    />
  );
}
