import { useState } from 'react';

import { type GapExerciseProps } from '@exercises/logic';
import { CardLayout } from '@workspace/ui';

import { useGapExercise } from '../Hooks/GapExerciseHook';
import { ExerciseInputBox } from '../../../Components/Atoms/ExerciseInputBox';
import { ExerciseTextbox } from '../../../components/atoms/ExerciseTextBox';

export function GapTypeTest({ exercise, onSubmit }: GapExerciseProps) {
  const {
    active,
    answers,
    score,
    phrase,
    isComplete,
    getState,
    submit,
    registerInputRef,
    nextStep,
  } = useGapExercise({ exercise, phraseIndex: 0, onSubmit });

  const [localInput, setLocalInput] = useState<Record<string, string>>({});

  // -------------------------
  // INPUT CHANGE
  // -------------------------
  function handleChange(gapId: string, value: string) {
    setLocalInput((prev) => ({
      ...prev,
      [gapId]: value,
    }));
  }

  // -------------------------
  // SUBMIT ON ENTER
  // -------------------------
  async function handleSubmit(gapId: string) {
    if (!active || gapId !== active.id) return;

    const value = localInput[gapId] ?? '';
    const result = await submit(value);

    if (result?.score === 'right') {
      // input leegmaken voor volgende ronde
      setLocalInput((prev) => ({
        ...prev,
        [gapId]: '',
      }));
    }
  }

  // -------------------------
  // RENDER SINGLE Phrase
  // -------------------------
  return (
    <CardLayout
      title={exercise.title}
      description={exercise.description}
      isComplete={isComplete}
      onContinue={nextStep}
      content={
        <div className='flex flex-col gap-6'>
          {/* Phrase */}
          <div className='flex flex-wrap items-center gap-2 text-lg'>
            {phrase?.textParts.map((part: string, index: number) => {
              const gap = phrase.gaps[index];
              const gapId = gap?.id ?? 'unknown';
              const isActive = active?.id === gapId;
              const isAnswered = !!answers[gapId];
              return (
                <span key={index} className='flex items-center gap-2'>
                  <span>{part}</span>
                  {gap &&
                    (isActive && !isAnswered ? (
                      <ExerciseInputBox
                        ref={(el: HTMLInputElement | null) => {
                          registerInputRef(gapId, el);
                        }}
                        hint={gap.hint}
                        size={gap.hint?.length ?? 1}
                        value={
                          active?.id === gapId
                            ? (localInput[gapId] ?? '')
                            : (answers[gapId] ?? '')
                        }
                        state={getState(gapId)}
                        score={score[gapId]}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleChange(gapId, e.target.value)
                        }
                        onKeyDown={(
                          e: React.KeyboardEvent<HTMLInputElement>,
                        ) => {
                          if (e.key === 'Enter') {
                            handleSubmit(gapId);
                          }
                        }}
                      />
                    ) : (
                      gap && (
                        <ExerciseTextbox
                          key={gapId}
                          form={answers[gapId] ?? ''}
                        />
                      )
                    ))}
                </span>
              );
            })}
          </div>

          {/* TRANSLATION */}
          <div className='text-sm text-gray-400'>{phrase?.translation}</div>
        </div>
      }
    />
  );
}
