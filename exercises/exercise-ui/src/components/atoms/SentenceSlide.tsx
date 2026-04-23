import React from 'react';

import { ExerciseInput } from '@workspace/ui';
import type { Sentence } from '@workspace/webtypes';

type Props = {
  sentence: Sentence;
  answers: Record<string, string>;
  setAnswers: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  wrong: boolean;
};

export function SentenceSlide({ sentence, answers, setAnswers, wrong }: Props) {
  return (
    <div className='flex flex-col gap-4'>
      {/* sentence */}
      <div className='flex flex-wrap items-center gap-2 text-lg'>
        {sentence.textParts.map((part, index) => {
          const gap = sentence.gaps[index];

          return (
            <span key={index} className='flex items-center gap-2'>
              <span>{part}</span>

              {gap && (
                <ExerciseInput
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
      {sentence.translation && (
        <div className='text-sm text-gray-400'>{sentence.translation}</div>
      )}
    </div>
  );
}
