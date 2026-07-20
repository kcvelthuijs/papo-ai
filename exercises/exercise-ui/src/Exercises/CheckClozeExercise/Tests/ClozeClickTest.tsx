import { useEffect, useMemo, useState } from 'react';

import { type ClozeExerciseProps } from '@exercises/logic';
import { CardLayout, shuffle } from '@workspace/ui';

import { useClozeExercise } from '../Hooks/ClozeExerciseHook';
import { AnswerButton } from '../../../Components/Atoms/AnswerButton';
import { ExerciseTextbox } from '../../../Components/Atoms/ExerciseTextBox';

export function ClozeClickTest({
  exercise,
  onSubmit,
  onComplete,
  handleAudio,
}: ClozeExerciseProps) {
  const {
    active,
    answers,
    phrase,
    clozeIndex,
    isComplete,
    buzy,
    tempFocus,
    getState,
    submit,
    next,
  } = useClozeExercise({
    exercise,
    onSubmit,
    onComplete,
    handleAudio,
  });

  const [options, setOptions] = useState<string[]>([]);

  // ---------------------------------------------------
  // SHUFFLE OPTIONS
  // ---------------------------------------------------
  useEffect(() => {
    if (!phrase?.gaps[clozeIndex]) return;
    else {
      const values = [
        ...(phrase?.gaps[clozeIndex ?? '']?.alt ?? []),
        phrase.gaps[clozeIndex].correct,
      ];
      const unique = [...new Set(values)];
      setOptions(shuffle(unique));
    }
  }, [active, phrase, clozeIndex, active?.id]);

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
        <div className='flex flex-col gap-6 items-center'>
          {/* Phrase */}
          <div className='flex flex-wrap gap-2 pt-4 pb-0 text-lg'>
            {phrase?.textParts.map((part: string, index: number) => {
              const cloze = phrase.gaps[index];
              const clozeId = cloze?.id ?? 'unknown';
              const isActive = active?.id === clozeId;
              const answer = answers[clozeId];
              return (
                <span key={index} className='flex items-center gap-2'>
                  <span>{part}</span>
                  {cloze && (
                    <ExerciseTextbox
                      textValue={
                        answer?.answer
                          ? answer.answer
                          : isActive
                            ? (cloze.hint ?? '')
                            : ''
                      }
                      state={getState(cloze.id, tempFocus)}
                      score={answers[cloze.id]?.score}
                    />
                  )}
                </span>
              );
            })}
          </div>

          {/* Translation */}
          <div className='text-sm text-gray-400 pb-4 pt-0'>
            {phrase?.translation}
          </div>
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
                score={answers[clozeIndex]?.score}
                disabled={buzy}
              >
                {option}
              </AnswerButton>
            ))}
        </div>
      }
    />
  );
}
