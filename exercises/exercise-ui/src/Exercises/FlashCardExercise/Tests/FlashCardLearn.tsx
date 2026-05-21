import { useState } from 'react';

import { CardLayout } from '@workspace/ui';

import { type FlashCardExerciseProps } from '@exercises/logic';
import type { FlashCardExercise, FlashCardItem } from '@workspace/dtotypes';

import { useFlashCardExercise } from '../Hooks/FlashCardHook';
import { ExerciseInputBox } from '../../../Components/Atoms/ExerciseInputBox';
import { ExerciseTextbox } from '../../../Components/Atoms/ExerciseTextBox';
import { ImageView } from '../../../Components/Atoms/ImageView';

type Props = {
  exercise: FlashCardExercise;
  onComplete: () => Promise<void>;
}

export function FlashCardTest({
  exercise,
  onComplete,
}: Props) {
  const [localInput, setLocalInput] = useState<Record<string, string>>({});

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
    exercise,
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
  // HANDLE REVEAL
  // -------------------------
  async function handleReveal() {
    if (!active) return;

    const correctAnswer = active.translation;
    setLocalInput((prev) => ({
      ...prev,
      [active.id]: correctAnswer,
    }));
    const result = await submit(correctAnswer);
    setLocalInput((prev) => ({
      ...prev,
      [active.id]: '',
    }));
    //next();
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
      onSkip={handleReveal}
      stars={stars}
      content={
        <div className='flex flex-col gap-6'>
          {/* CARD CONTENT */}
          <div className='flex min-h-80 w-full flex-col items-center justify-center rounded-lg border border-gray-300 p-6'>
            {/* IMAGE */}
            {active?.image && (
              <div className='mb-2 flex w-full justify-center'>
                <ImageView
                  name={active.image}
                  tree={exercise.imageLocation ?? ['flashcards']}
                  size='none'
                  className='max-h-64 object-contain rounded-sm'
                />
              </div>
            )}

            {/* WORD */}
            <div
              ref={(el) =>
                active?.id ? registerStarRef(active.id, el) : undefined
              }
              className='flex flex-1 items-center justify-center text-center text-3xl font-semibold'
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
