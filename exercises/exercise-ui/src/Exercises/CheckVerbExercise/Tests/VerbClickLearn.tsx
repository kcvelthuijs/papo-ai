import { useState } from 'react';

import { AnswerButton } from '@workspace/ui';
import type { VerbExerciseProps } from '@exercises/logic';
import type { ExerciseInputState, PronounId } from '@workspace/webtypes';

import { VerbCardLayout } from '../Layouts/VerbCardLayout';
import { ExerciseTextbox } from '../../../components/atoms/ExerciseTextBoxes';

export function VerbClickLearn({ exercise, onSubmit }: VerbExerciseProps) {
  const pronouns = Object.keys(exercise.forms);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [wrong, setWrong] = useState<string | null>(null);

  const nextPronoun = pronouns.find((p) => !answers[p]);
  const nextForm = exercise.forms[nextPronoun ?? 0];
  const isComplete = nextPronoun === undefined;

  function getState(pronounId: PronounId): ExerciseInputState {
    switch (answers[pronounId]) {
      case 'wrong':
        return 'wrong';
      case 'correct':
        return 'correct';
      default:
        if (pronounId === nextPronoun) return 'input';
        else return 'idle';
    }
  }

  async function handleSelect(id: string, value: string) {
    if (!nextPronoun) return;
    const result = await onSubmit({
      pronounId: nextPronoun,
      value,
    });
    if (result.answer.isCorrect) {
      setAnswers((prev) => ({
        ...prev,
        [nextPronoun]: value,
      }));
    } else {
      setWrong(id);
      setTimeout(() => setWrong(null), 600);
    }
  }

  return (
    <VerbCardLayout
      title={exercise.title + ' clicklearn'}
      description={exercise.description}
      activePronounId={nextPronoun}
      complete={isComplete}
      renderField={(pronounId, isActive) => (
        <ExerciseTextbox
          key={pronounId}
          form={answers[pronounId] ?? ''}
          state={getState(pronounId as PronounId)}
        />
      )}
      footer={
        !isComplete && (
          <div className='flex flex-col items-center'>
            <AnswerButton
              id={1}
              key={nextPronoun}
              onClick={() => handleSelect(nextPronoun ?? '', nextForm ?? '')}
              state={wrong === nextPronoun}
            >
              {nextForm}
            </AnswerButton>
          </div>
        )
      }
    ></VerbCardLayout>
  );
}
