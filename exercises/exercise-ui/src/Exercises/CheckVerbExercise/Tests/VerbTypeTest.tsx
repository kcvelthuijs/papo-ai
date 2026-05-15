import { useState } from 'react';

import { type VerbExerciseProps } from '@exercises/logic';
import { type PronounId } from '@workspace/webtypes';

import { VerbCardLayout } from '../Layouts/VerbCardLayout';
import { useVerbExercise } from '../Hooks/VerbExerciseHook';
import { ExerciseInputBox } from '../../../Components/Atoms/ExerciseInputBox';
import { useExerciseStars } from '../../../Components/Hooks/useExerciseEffects';

export function VerbTypeTest({
  exercise,
  onSubmit,
  onComplete,
}: VerbExerciseProps) {
  const {
    active,
    answers,
    tempFocus,
    isComplete,
    getState,
    submit,
    registerInputRef,
  } = useVerbExercise({ onSubmit, onComplete });

  const { stars, spawnStars, registerStarRef } = useExerciseStars();
  const [localInput, setLocalInput] = useState<Record<string, string>>({});

  // -------------------------
  // INPUT CHANGE
  // -------------------------
  function handleChange(pronounId: PronounId, value: string) {
    setLocalInput((prev) => ({
      ...prev,
      [pronounId]: value,
    }));
  }

  // -------------------------
  // SUBMIT ON ENTER
  // -------------------------
  async function handleSubmit(pronounId: PronounId) {
    if (!active || pronounId !== active) return;

    const value = localInput[pronounId] ?? '';
    const result = await submit(value);

    if (result?.score === 'right') {
      // laat zien dat het antwoord goed is
      spawnStars(pronounId);

      // input leegmaken voor volgende ronde
      setLocalInput((prev) => ({
        ...prev,
        [pronounId]: '',
      }));
    }
  }

  async function handleComplete() {
    if (onComplete) await onComplete('end');
  }

  // -------------------------
  // RENDER
  // -------------------------
  return (
    <VerbCardLayout
      title={exercise.title}
      description={exercise.description}
      activePronounId={active}
      stars={stars}
      isComplete={isComplete}
      onComplete={handleComplete}
      renderField={(pronounId) => {
        const value = answers[pronounId]?.answer ?? localInput[pronounId] ?? '';

        return (
          <ExerciseInputBox
            key={pronounId}
            ref={(el: HTMLInputElement | null) => {
              registerInputRef(pronounId as PronounId, el);
              registerStarRef(pronounId, el);
            }}
            value={value}
            // disabled={!(getState(pronounId as PronounId) == 'input')}
            state={getState(pronounId as PronounId, tempFocus)}
            score={answers[pronounId]?.score}
            size={Math.max(
              ...Object.values(exercise.forms).map((v: any) => v.length),
            )}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(pronounId as PronounId, e.target.value)
            }
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === 'Enter') {
                handleSubmit(pronounId as PronounId);
              }
            }}
          />
        );
      }}
    />
  );
}
