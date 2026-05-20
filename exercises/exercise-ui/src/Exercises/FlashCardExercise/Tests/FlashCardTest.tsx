import { useMemo, useState } from 'react';

import { CardLayout, shuffle } from '@workspace/ui';

import { type FlashCardExerciseProps } from '@exercises/logic';

import { useFlashCardExercise } from '../Hooks/FlashCardHook';
import type { FlashCardFeedback, FlashCardItem } from '@workspace/dtotypes';

import { useExerciseStars } from '../../../Components/Hooks/useExerciseEffects';
import { ExerciseInputBox } from '../../../Components/Atoms/ExerciseInputBox';
import { ExerciseTextbox } from '../../../Components/Atoms/ExerciseTextBox';

export function FlashCardTest({
  exercise,
  onSubmit,
  onComplete,
}: FlashCardExerciseProps) {
  const randomItems = useMemo<FlashCardItem[]>(
    () => shuffle(exercise.items),
    [exercise.items],
  );
  const [localInput, setLocalInput] = useState<Record<string, string>>({});
  const { stars, spawnStars, registerStarRef } = useExerciseStars();

  const {
    active,
    answers,
    isComplete,
    tempFocus,
    getState,
    submit,
    inputRef,
    next,
  } = useFlashCardExercise({
    exercise: { ...exercise, items: randomItems },
    onSubmit,
    onComplete,
  });

  const currentValue = active ? (localInput[active.id] ?? '') : '';
  const answer = active ? answers[active.id] : undefined;
  const isAnswered = answer?.score === 'right' || answer?.score === 'partial';

  // -------------------------
  // INPUT CHANGE
  // -------------------------
  function handleChange(value: string) {
    if (!active) return;

    setLocalInput((prev) => ({
      ...prev,
      [active.id]: value,
    }));
  }

  // -------------------------
  // SUBMIT ON ENTER
  // -------------------------
  async function handleSubmit() {
    if (!active) return;

    const value = localInput[active.id] ?? '';
    const result = await submit(value);

    if (result?.score !== 'wrong') {
      // laat zien dat het antwoord goed is
      spawnStars(active.id);
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
          {/* CARD CONTENT */}
          <div className='flex min-h-80 w-full flex-col items-center justify-center rounded-lg border border-gray-300 p-6'>
            {/* IMAGE */}
            {active?.image && (
              <div className='mb-6 flex w-full justify-center'>
                <img
                  src={active.image}
                  alt={active.word}
                  className='max-h-48 rounded-lg object-contain'
                />
              </div>
            )}

            {/* WORD */}
            <div
              ref={(el) =>
                active?.id ? registerStarRef(active.id, el) : undefined
              }
              className='flex flex-1 items-center justify-center text-center text-4xl font-semibold'
            >
              {active?.word}
            </div>
          </div>

          <div className='flex justify-center'>
            {active &&
              (!isAnswered ? (
                <ExerciseInputBox
                  key={active.id}
                  ref={inputRef}
                  value={currentValue}
                  hint={active.hint}
                  size={Math.max(active.translation.length, 10)}
                  state={getState(active.id, tempFocus)}
                  score={answer?.score}
                  className='min-w-60 text-center text-xl'
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleChange(e.target.value)
                  }
                  onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                    if (e.key === 'Enter') {
                      handleSubmit();
                    }
                  }}
                />
              ) : (
                <ExerciseTextbox
                  textValue={answer?.givenAnswer ?? ''}
                  state={getState(active.id, tempFocus)}
                  score={answer?.score}
                  className='text-xl'
                />
              ))}
          </div>
        </div>
      }
    />
  );
}
