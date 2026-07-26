import { useEffect, useState } from 'react';

import { useDialogStore } from '@workspace/controllers';
import { CardLayout, Spinner } from '@workspace/ui';
import type { ChatExerciseProps } from '@exercises/logic';

import { ChatMessageList } from '../../../Components/Atoms/ChatMessageList';
import { ChatInput } from '../../../Components/Atoms/ChatInput';
import { AudioPlayer } from '../../../Components/Atoms/AudioPlayer';
import type { ChatMessage, CompletionRule } from '@workspace/dtotypes';

import {
  areAllPhraseStatesCompleted,
  createPhraseList,
  createPhraseStates,
  updatePhraseStates,
  type Phrase,
  type PhraseList,
  type PhraseStates,
} from '../Helpers/UpdatePhraseStates';
import { PhraseProgress } from '../Layouts/PhraseProgress';

export function CheckChatTest({
  exercise,
  onSubmit,
  onComplete,
  handleAudio,
}: ChatExerciseProps) {
  const { messages, isBusy, isErr, errorMessage } = useDialogStore();
  const [sceneId, setSceneId] = useState<number>(0);

  const [phrases, setPhrases] = useState<PhraseList>({});
  const [phraseStates, setPhraseStates] = useState<PhraseStates>({});
  const [isPlaying, setPlaying] = useState<boolean>(false);

  if (isErr) {
    return <div className='p-4 text-red-600'>{errorMessage}</div>;
  }

  useEffect(() => {
    // speel de eerste melding
    if (messages && messages.length == 1) {
      startAudio(messages[0]!);
    }
  }, [messages]);

  useEffect(() => {
    const rules = exercise.scenes[0]?.completionRules;
    if (rules) {
      const phraseList = createPhraseList(rules);
      setPhrases(phraseList);
      setPhraseStates(createPhraseStates(phraseList));
    }
  }, [exercise]);

  // -------------------------
  // HANDLE NEXTSCENE
  // -------------------------
  const nextScene = () => {
    const nextSceneId = sceneId + 1;
    const nextSceneData = exercise.scenes[nextSceneId];
    if (nextSceneData) {
      const phraseList = createPhraseList(nextSceneData.completionRules);
      setSceneId(nextSceneId);
      setPhrases(phraseList);
      setPhraseStates(createPhraseStates(phraseList));
      useDialogStore.getState().assignment =
        nextSceneData.prompt ?? 'continue your conversation';
      return true;
    } else return false;
  };

  // -------------------------
  // HANDLE SUBMIT
  // -------------------------
  const handleSubmit = async (text: string) => {
    const phraseList = createPhraseList(
      exercise.scenes[sceneId]?.completionRules ?? [],
    );
    const updatedPhraseStates = updatePhraseStates(
      text,
      phraseList,
      phraseStates,
    );
    setPhraseStates(updatedPhraseStates);
    const completed = areAllPhraseStatesCompleted(updatedPhraseStates);
    if (completed) {
      const moved = nextScene();
      if (!moved) {
        await onComplete('end');
        return;
      }
    }

    // Add input from user to the dialogue
    useDialogStore.getState().sayMessage = startAudio;
    useDialogStore.getState().addMessage(text);
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
  // COMPLETE
  // -------------------------
  async function handleComplete() {
    if (onComplete) await onComplete('end');
  }

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
            <PhraseProgress phrases={phrases} states={phraseStates} />
            <ChatInput onSubmit={handleSubmit} isDisabled={isBusy} />
          </>
        )}
      </>
      takesFullScreen
    />
  );
}
