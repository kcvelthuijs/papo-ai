import { useState } from 'react';

import type { OpenExerciseProps } from '@exercises/logic';
import { useOpenDialogHook } from '../Hooks/OpenDialogHook';
import { ChatMessageList } from '../../../Components/Atoms/ChatMessageList';
import { ChatInput } from '../../../Components/Atoms/ChatInput';
import { TypingIndicator } from '../../../Components/Atoms/TypingIndicator';
import { WordBadge } from '../../../Components/Atoms/WordBadge';

export function OpenDialogTest({
  exercise,
  onSubmit,
  onComplete,
}: OpenExerciseProps) {
  const { messages, words, submit, isSubmitting, isComplete } =
    useOpenDialogHook({
      exercise,
      onSubmit,
      onComplete,
    });

  return (
    <div className='flex flex-col h-full'>
      {/* WORD STATUS */}
      <div className='flex flex-wrap gap-2 p-2 border-b'>
        {words.map((w) => (
          <WordBadge key={w.word} word={w.word} used={w.used} />
        ))}
      </div>

      {/* CHAT */}
      <div className='flex-1 overflow-y-auto p-2'>
        <ChatMessageList messages={messages} />
        {isSubmitting && <TypingIndicator />}
      </div>

      {/* INPUT */}
      <div className='p-2 border-t'>
        <ChatInput
          onSubmit={(value: string) => submit(value)}
          isDisabled={isSubmitting || isComplete}
        />
      </div>
    </div>
  );
}
