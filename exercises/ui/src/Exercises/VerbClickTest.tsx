import { useState } from 'react';
import { shuffle } from '@workspace/ui/lib/shuffle';

import { VerbCardLayout } from '../Layouts/VerbCardLayout';
import { type VerbExerciseProps } from '@exercises/logic/src/Types/Exercise.types';

export function VerbClickTest({ exercise, onSubmit }: VerbExerciseProps) {
  const [feedback, setFeedback] = useState<Record<string, any>>({});
  const [selected, setSelected] = useState<Record<string, string>>({});

  const options = useState(() => shuffle(Object.values(exercise.forms)))[0];
  const pronouns = Object.keys(exercise.forms);

  async function handleClick(pronounId: string, value: string) {
    setSelected((prev) => ({
      ...prev,
      [pronounId]: value,
    }));
    const result = await onSubmit({ pronounId, value });
    setFeedback((prev) => ({
      ...prev,
      [pronounId]: result,
    }));
  }

  return (
    <VerbCardLayout
      title={exercise.title}
      description={exercise.description}
      footer={
        Object.keys(feedback).length === pronouns.length && (
          <div className='flex justify-end'>
            <span className='text-sm text-gray-500'>Exercise completed</span>
          </div>
        )
      }
    >
      <div className='flex flex-col gap-6'>
        {pronouns.map((pronounId) => {
          const result = feedback[pronounId];
          return (
            <div key={pronounId} className='flex items-center gap-4'>
              {/* pronoun */}
              <div className='w-20 font-medium'>{pronounId}</div>

              {/* options */}
              <div className='flex gap-2 flex-wrap'>
                {options.map((option) => {
                  const isSelected = selected[pronounId] === option;

                  const isCorrectSelection =
                    result?.value === option && result?.isCorrect === true;

                  const isWrongSelection =
                    result?.value === option && result?.isCorrect === false;

                  return (
                    <button
                      key={option}
                      onClick={() => handleClick(pronounId, option)}
                      className={`
                        px-3 py-1 border rounded transition
                        ${isSelected ? 'bg-gray-100' : ''}
                        ${
                          isCorrectSelection
                            ? 'border-green-500 bg-green-50'
                            : ''
                        }
                        ${isWrongSelection ? 'border-red-500 bg-red-50' : ''}
                      `}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>

              {/* feedback icon */}
              <div className='w-6 text-lg'>
                {result?.isCorrect && '✅'}
                {result && !result.isCorrect && '❌'}
              </div>
            </div>
          );
        })}
      </div>
    </VerbCardLayout>
  );
}
