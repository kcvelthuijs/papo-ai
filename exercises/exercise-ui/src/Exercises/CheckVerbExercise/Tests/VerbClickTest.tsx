import { useState } from 'react';

import { shuffle } from '@workspace/ui/lib/shuffle';
import { AnswerButton } from '@workspace/ui';
import { type VerbExerciseProps } from '@exercises/logic';
import {
  EXERCISE_FEEDBACK_TIME,
  type VerbFormRow,
  buildVerbForms,
} from '@workspace/webtypes';
import type { ExerciseScore, PronounId } from '@workspace/dtotypes';

import { VerbCardLayout } from '../Layouts/VerbCardLayout';
import { useVerbExercise } from '../Hooks/VerbExerciseHook';
import { ExerciseTextbox } from '../../../components/atoms/ExerciseTextBox';

type ButtonFeedBack = {
  id: string;
  score: ExerciseScore;
};

export function VerbClickTest({ exercise, onSubmit }: VerbExerciseProps) {
  const { active, answers, score, getState, submit, isComplete } =
    useVerbExercise({ onSubmit });
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

  // -------------------------
  // RENDER
  // -------------------------
  return (
    <VerbCardLayout
      title={exercise.title}
      description={exercise.description}
      activePronounId={active}
      complete={isComplete}
      renderField={(pronounId) => (
        <ExerciseTextbox
          key={pronounId}
          form={answers[pronounId] ?? ''}
          state={getState(pronounId as PronounId)}
          score={score[pronounId]}
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
