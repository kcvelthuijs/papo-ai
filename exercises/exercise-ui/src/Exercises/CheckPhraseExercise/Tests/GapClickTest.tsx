import { useEffect, useMemo, useState } from 'react';

import { type GapExerciseProps } from '@exercises/logic';
import { type ExerciseScore } from '@workspace/dtotypes';
import { CardLayout, shuffle } from '@workspace/ui';

import { useGapExercise } from '../Hooks/GapExerciseHook';
import { AnswerButton } from '../../../Components/Atoms/AnswerButton';
import { ExerciseTextbox } from '../../../Components/Atoms/ExerciseTextBox';
import { EXERCISE_FEEDBACK_TIME } from '@workspace/webtypes';

export function GapClickTest({
  exercise,
  onSubmit,
  onComplete,
}: GapExerciseProps) {
  const {
    active,
    answers,
    phrase,
    gapIndex,
    isComplete,
    tempFocus,
    getState,
    submit,
    next,
  } = useGapExercise({
    exercise,
    onSubmit,
    onComplete,
  });

  const [options, setOptions] = useState<string[]>([]);

  // ---------------------------------------------------
  // SHUFFLE OPTIONS
  // ---------------------------------------------------
  useEffect(() => {
    if (!phrase?.gaps[gapIndex]) return;
    else {
      const values = [
        ...(phrase?.gaps[gapIndex ?? '']?.alt ?? []),
        phrase.gaps[gapIndex].correct,
      ];
      const unique = [...new Set(values)];
      setOptions(shuffle(unique));
    }
  }, [active, phrase, gapIndex, active?.id]);

  // ---------------------------------------------------
  // HANDLE CLICK
  // ---------------------------------------------------
  async function handleSelect(value: string) {
    if (!active) return;
    await submit(value);
  }

  // ---------------------------------------------------
  // RENDER
  // ---------------------------------------------------
  return (
    <CardLayout
      title={exercise.title}
      description={exercise.description}
      isComplete={isComplete}
      onContinue={next}
      content={
        <div className='flex flex-col gap-6'>
          {/* Phrase */}
          <div className='flex flex-wrap items-center gap-2 text-lg'>
            {phrase?.textParts.map((part: string, index: number) => {
              const gap = phrase.gaps[index];
              const gapId = gap?.id ?? 'unknown';
              const isActive = active?.id === gapId;
              const answer = answers[gapId];
              return (
                <span key={index} className='flex items-center gap-2'>
                  <span>{part}</span>
                  {gap && (
                    <ExerciseTextbox
                      textValue={
                        answer?.answer
                          ? answer.answer
                          : isActive
                            ? (gap.hint ?? '')
                            : ''
                      }
                      state={getState(gap.id, tempFocus)}
                      score={answers[gap.id]?.score}
                    />
                  )}
                </span>
              );
            })}
          </div>

          {/* Translation */}
          <div className='text-sm text-gray-400'>{phrase?.translation}</div>
        </div>
      }
      footer={
        <div className='flex flex-wrap gap-2 justify-center'>
          {!isComplete &&
            options.map((option) => (
              <AnswerButton
                key={option}
                id={option}
                onClick={() => handleSelect(option)}
                score={answers[gapIndex]?.score}
              >
                {option}
              </AnswerButton>
            ))}
        </div>
      }
    />
  );
}
