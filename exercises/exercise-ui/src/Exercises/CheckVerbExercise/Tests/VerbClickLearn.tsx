import { useState } from 'react';

import type { VerbExerciseProps } from '@exercises/logic';
import {
  buildVerbForms,
  EXERCISE_FEEDBACK_TIME,
  type PronounId,
} from '@workspace/webtypes';

import { VerbCardLayout } from '../Layouts/VerbCardLayout';
import { AnswerButton } from '../../../Components/Atoms/AnswerButton';
import { ExerciseTextbox } from '../../../Components/Atoms/ExerciseTextBox';
import { type ExerciseScore, type VerbFormRow } from '@workspace/dtotypes';
import { useVerbExercise } from '../Hooks/VerbExerciseHook';

type ButtonFeedBack = {
  id: string;
  score: ExerciseScore;
};

export function VerbClickLearn({
  exercise,
  onSubmit,
  onComplete,
  handleAudio,
}: VerbExerciseProps) {
  const { active, answers, tempFocus, isComplete, getState, submit, busy } =
    useVerbExercise({ onSubmit, onComplete, handleAudio });
  const [vervoeging, setVervoeging] = useState<VerbFormRow[]>(
    buildVerbForms(exercise),
  );
  const [feedback, setFeedback] = useState<ButtonFeedBack>();

  // -------------------------
  // SUBMIT HANDLER
  // -------------------------
  async function handleSelect(item: VerbFormRow) {
    if (!active) return;

    const result = await submit(item.form);
    if (result?.score == 'right') {
      setVervoeging((prev) => prev.filter((v) => v.id !== item.id));
    }
    // pas de buttonState tijdelijk aan
    setFeedback({ id: item.id, score: result?.score });
    setTimeout(() => {
      setFeedback({ id: item.id, score: undefined });
    }, EXERCISE_FEEDBACK_TIME);
  }

  // -------------------------
  // COMPLETE
  // -------------------------
  async function handleComplete() {
    if (onComplete) await onComplete('end');
  }

  // -------------------------
  // QUIT
  // -------------------------
  function quit() {
    onComplete('quit');
  }

  return (
    <VerbCardLayout
      title={exercise.title + ' clicklearn'}
      description={exercise.description}
      activePronounId={active}
      isComplete={isComplete}
      onComplete={handleComplete}
      onClose={quit}
      renderField={(pronounId) => (
        <ExerciseTextbox
          key={pronounId}
          textValue={answers[pronounId]?.answer ?? ''}
          state={getState(pronounId as PronounId, tempFocus)}
          score={answers[pronounId]?.score}
        />
      )}
      footer=<div className='flex flex-col items-center'>
        {!isComplete && (
          <AnswerButton
            id={1}
            key={active}
            onClick={() =>
              vervoeging[0] ? handleSelect(vervoeging[0]) : undefined
            }
            score={active ? answers[active]?.score : undefined}
            disabled={busy}
          >
            {vervoeging[0]?.form}
          </AnswerButton>
        )}
      </div>
    ></VerbCardLayout>
  );
}
