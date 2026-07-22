import { useState } from 'react';

import { Spinner } from '@workspace/ui';
import type { ChatExerciseProps as ChatExerciseProps } from '@exercises/logic';
import {
  type AddConversationResponse,
  type ChatExercise,
} from '@workspace/dtotypes';

import {
  CreateConversation,
  AddConversationMessage,
} from '@workspace/connectors';

import { useChatExerciseHook } from '../Hooks/ChatExerciseHook';
import { ChatMessageList } from '../../../Components/Atoms/ChatMessageList';
import { ChatInput } from '../../../Components/Atoms/ChatInput';
import { TypingIndicator } from '../../../Components/Atoms/TypingIndicator';
import { WordBadge } from '../../../Components/Atoms/WordBadge';

import {
  getChatSystemPrompt,
  getChatExerciseIntroPrompt,
} from '../Helpers/ChatExercisePromptBuilder';

export function CheckChatTest({
  exercise,
  onSubmit,
  onComplete,
  handleAudio,
}: ChatExerciseProps) {
  const { messages, words, submit, isSubmitting, isComplete } =
    useChatExerciseHook({
      exercise,
      onSubmit,
      onComplete,
    });

  const [isLoading, setLoading] = useState<boolean>(true);

  const startDialog = async (
    exercise: ChatExercise,
  ): Promise<AddConversationResponse | undefined> => {
    // Start de conversatie
    const conversation = await CreateConversation({
      userId: 'system',
      title: exercise.title,
      introduction: getChatExerciseIntroPrompt(exercise),
    });
    if (!conversation) throw new Error('Unable to create conversation!');

    // Stel de eerste vraag
    const response = await AddConversationMessage({
      conversationId: conversation.id,
      role: 'system',
      instructions: getChatSystemPrompt(exercise, 0),
      prompt: 'Open het gesprek met een eerste vraag.',
    });
    if (!response) throw new Error('Initial message failed!');

    return {
      conversationId: conversation.id,
      responseId: response?.responseId ?? '',
      message: response?.message ?? '',
      role: response?.role ?? 'assistant',
    };
  };

  // map alle woorden naar een word-structuur
  const systemResponse = startDialog(exercise);
  console.log(systemResponse);

  return (
    <div className='flex flex-col h-full'>
      {isLoading ? (
        <>
          <Spinner className='h-8 w-8' />
          <span className='lg:text-lg font-medium mr-4'>
            Preparar a aula...
          </span>
        </>
      ) : (
        <>
          {/*<div className='flex flex-wrap gap-2 p-2 border-b'>
            {words.map((w) => (
              <WordBadge key={w.word} word={w.word} used={w.used} />
            ))}
          </div>*/}

          <div className='flex-1 overflow-y-auto p-2'>
            <ChatMessageList messages={messages} />
            {isSubmitting && <TypingIndicator />}
          </div>

          <div className='p-2 border-t'>
            <ChatInput
              onSubmit={(value: string) => submit(value)}
              isDisabled={isSubmitting || isComplete}
            />
          </div>
        </>
      )}
    </div>
  );
}
