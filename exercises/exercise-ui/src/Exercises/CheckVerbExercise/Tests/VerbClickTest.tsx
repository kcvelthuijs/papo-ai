import { useState } from 'react';

import { shuffle } from '@workspace/ui/lib/shuffle';
import { type VerbExerciseProps } from '@exercises/logic';
import {
  EXERCISE_FEEDBACK_TIME,
  type VerbFormRow,
  buildVerbForms,
} from '@workspace/webtypes';
import type { ExerciseScore, PronounId } from '@workspace/dtotypes';

import { VerbCardLayout } from '../Layouts/VerbCardLayout';
import { useVerbExercise } from '../Hooks/VerbExerciseHook';
import { AnswerButton } from '../../../Components/Atoms/AnswerButton';
import { ExerciseTextbox } from '../../../Components/Atoms/ExerciseTextBox';

type ButtonFeedBack = {
  id: string;
  score: ExerciseScore;
};

export function VerbClickTest({
  exercise,
  onSubmit,
  onComplete,
  handleAudio,
}: VerbExerciseProps) {
  const { active, answers, tempFocus, isComplete, getState, submit, busy } =
    useVerbExercise({
      onSubmit,
      onComplete,
      handleAudio,
    });
  const [vervoeging, setVervoeging] = useState<VerbFormRow[]>(
    shuffle(buildVerbForms(exercise)),
  );
  const [feedback, setFeedback] = useState<ButtonFeedBack>();

  // -------------------------
  // SUBMIT HANDLER
  // -------------------------
  async function handleSelect(item: VerbFormRow) {
    if (!active) return;

    const result = await submit(item.form);
    if (result?.score === 'right') {
      setVervoeging((prev) => prev.filter((v) => v.id !== item.id));
    }

    // pas de buttonState tijdelijk aan
    setFeedback({ id: item.id, score: result?.score });
    setTimeout(() => {
      setFeedback({ id: item.id, score: undefined });
    }, EXERCISE_FEEDBACK_TIME);
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
      isComplete={isComplete}
      onComplete={handleComplete}
      renderField={(pronounId) => (
        <ExerciseTextbox
          textValue={answers[pronounId]?.answer ?? ''}
          state={getState(pronounId as PronounId, tempFocus)}
          score={answers[pronounId]?.score}
        />
      )}
      footer={
        !isComplete && (
          <div className='flex flex-wrap gap-2 justify-center'>
            {vervoeging.map((v) => (
              <AnswerButton
                key={v.id}
                id={v.id}
                onClick={() => handleSelect(v)}
                disabled={busy}
                score={feedback?.id === v.id ? feedback.score : undefined}
              >
                {v.form}
              </AnswerButton>
            ))}
          </div>
        )
      }
    />
  );
}
