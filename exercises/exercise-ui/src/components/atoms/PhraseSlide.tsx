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
    <div className='flex flex-col cloze-4'>
      {/* Phrase */}
      <div className='flex flex-wrap items-center cloze-2 text-lg'>
        {Phrase.textParts.map((part, index) => {
          const cloze = Phrase.gaps[index];

          return (
            <span key={index} className='flex items-center cloze-2'>
              <span>{part}</span>

              {cloze && (
                <ExerciseInputBox
                  value={answers[cloze.id] || ''}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setAnswers((prev) => ({
                      ...prev,
                      [cloze.id]: e.target.value,
                    }))
                  }
                  state={wrong ? 'wrong' : 'idle'}
                  size={(answers[cloze.id]?.length || 1) + 1}
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
