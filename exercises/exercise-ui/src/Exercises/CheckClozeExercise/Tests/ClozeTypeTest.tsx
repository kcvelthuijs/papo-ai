import { useState } from 'react';

import { type ClozeExerciseProps } from '@exercises/logic';
import { CardLayout } from '@workspace/ui';

import { useClozeExercise } from '../Hooks/ClozeExerciseHook';
import { useExerciseStars } from '../../../Components/Hooks/useExerciseEffects';

import { ExerciseInputBox } from '../../../Components/Atoms/ExerciseInputBox';
import { ExerciseTextbox } from '../../../Components/Atoms/ExerciseTextBox';

export function ClozeTypeTest({
  exercise,
  onSubmit,
  onComplete,
}: ClozeExerciseProps) {
  const {
    active,
    answers,
    phrase,
    isComplete,
    tempFocus,
    getState,
    submit,
    registerInputRef,
    next,
  } = useClozeExercise({ exercise, onSubmit, onComplete });

  const { stars, spawnStars, registerStarRef } = useExerciseStars();
  const [localInput, setLocalInput] = useState<Record<string, string>>({});

  // -------------------------
  // INPUT CHANGE
  // -------------------------
  function handleChange(clozeId: string, value: string) {
    setLocalInput((prev) => ({
      ...prev,
      [clozeId]: value,
    }));
  }

  // -------------------------
  // SUBMIT ON ENTER
  // -------------------------
  async function handleSubmit(clozeId: string) {
    if (!active || clozeId !== active.id) return;

    const value = localInput[clozeId] ?? '';
    const result = await submit(value);

    if (result?.score === 'right') {
      // laat zien dat het antwoord goed is
      spawnStars(clozeId);

      // input leegmaken voor volgende ronde
      setLocalInput((prev) => ({
        ...prev,
        [clozeId]: '',
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
      onContinue={next}
      stars={stars}
      content={
        <div className='flex flex-col gap-6'>
          {/* Phrase */}
          <div className='flex flex-wrap items-center gap-2 text-lg'>
            {phrase?.textParts.map((part: string, index: number) => {
              const cloze = phrase.gaps[index];
              const clozeId = cloze?.id ?? 'unknown';
              const isActive = active?.id === clozeId;
              const isAnswered = answers[clozeId]?.score === 'right';
              return (
                <span key={index} className='flex items-center gap-2'>
                  <span>{part}</span>
                  <span ref={(el) => registerStarRef(clozeId, el)}>
                    {cloze &&
                      (isActive && !isAnswered ? (
                        <ExerciseInputBox
                          key={`cloze${clozeId}`}
                          ref={(el: HTMLInputElement | null) => {
                            registerInputRef(clozeId, el);
                            registerStarRef(clozeId, el);
                          }}
                          hint={cloze.hint}
                          size={cloze.hint?.length ?? 1}
                          value={
                            active?.id === clozeId
                              ? (localInput[clozeId] ?? '')
                              : (answers[clozeId]?.answer ?? '')
                          }
                          state={getState(clozeId, tempFocus)}
                          score={answers[clozeId]?.score}
                          className='text-center'
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleChange(clozeId, e.target.value)
                          }
                          onKeyDown={(
                            e: React.KeyboardEvent<HTMLInputElement>,
                          ) => {
                            if (e.key === 'Enter') {
                              handleSubmit(clozeId);
                            }
                          }}
                        />
                      ) : (
                        cloze && (
                          <ExerciseTextbox
                            textValue={answers[clozeId]?.answer ?? ''}
                            state={getState(cloze.id, tempFocus)}
                            score={answers[cloze.id]?.score}
                          />
                        )
                      ))}
                  </span>
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
