import { useMemo, useState } from 'react';

import { CardLayout, shuffle } from '@workspace/ui';

import { type CardExerciseProps } from '@exercises/logic';

import { useCardExercise } from '../Hooks/CardHook';
import type { CardItem } from '@workspace/dtotypes';

import { useExerciseStars } from '../../../Components/Hooks/useExerciseEffects';
import { ExerciseInputBox } from '../../../Components/Atoms/ExerciseInputBox';
import { ExerciseTextbox } from '../../../Components/Atoms/ExerciseTextBox';
import { ImageView } from '../../../Components/Atoms/ImageView';

export function CardTest({
  exercise,
  onSubmit,
  onComplete,
}: CardExerciseProps) {
  const randomItems = useMemo<CardItem[]>(
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
  } = useCardExercise({
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
  // HANDLE REVEAL
  // -------------------------
  async function handleReveal() {
    if (!active) return;

    const correctAnswer = active.response;
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
      image={
        <ImageView
          name={active?.name ?? ''}
          tree={active?.tree ?? ['flashcards']}
          size='none'
          className='w-full h-auto object-contain pt-0 mt-0 cloze-0'
        />
      }
      content={
        <div className='flex flex-col py-1'>
          {/* CARD CONTENT */}
          <div className='flex w-full flex-col items-center justify-center p-2'>
            {/* WORD */}
            <div
              ref={(el) =>
                active?.id ? registerStarRef(active.id, el) : undefined
              }
              className='flex flex-1 items-center justify-center text-center text-3xl font-semibold'
            >
              {active?.question}
            </div>
          </div>

          <div className='flex justify-center pb-2'>
            {active &&
              (!isAnswered ? (
                <ExerciseInputBox
                  key={active.id}
                  ref={inputRef}
                  value={currentValue}
                  hint={active.hint}
                  size={Math.max(active.response.length, 10)}
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
