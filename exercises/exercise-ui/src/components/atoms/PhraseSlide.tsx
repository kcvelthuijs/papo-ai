import React from 'react';

import { ExerciseInputBox } from './ExerciseInputBox';
import type { Phrase } from '@workspace/webtypes';

type Props = {
  Phrase: Phrase;
  answers: Record<string, string>;
  setAnswers: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  wrong: boolean;
};

export function PhraseSlide({ Phrase, answers, setAnswers, wrong }: Props) {
  return (
    <div className='flex flex-col gap-4'>
      {/* Phrase */}
      <div className='flex flex-wrap items-center gap-2 text-lg'>
        {Phrase.textParts.map((part, index) => {
          const gap = Phrase.gaps[index];

          return (
            <span key={index} className='flex items-center gap-2'>
              <span>{part}</span>

              {gap && (
                <ExerciseInputBox
                  value={answers[gap.id] || ''}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setAnswers((prev) => ({
                      ...prev,
                      [gap.id]: e.target.value,
                    }))
                  }
                  state={wrong ? 'wrong' : 'idle'}
                  size={(answers[gap.id]?.length || 1) + 1}
                />
              )}
            </span>
          );
        })}
      </div>

      {/* translation (content-level, NOT footer) */}
      {Phrase.translation && (
        <div className='text-sm text-gray-400'>{Phrase.translation}</div>
      )}
    </div>
  );
}
