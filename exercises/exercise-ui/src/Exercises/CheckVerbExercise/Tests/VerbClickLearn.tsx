import { useState } from 'react';

import { AnswerButton } from '@workspace/ui';
import type { VerbExerciseProps } from '@exercises/logic';

import { VerbCardLayout } from '../Layouts/VerbCardLayout';
import { VerbRow } from '../Renderer/VerbCardText';

export function VerbClickLearn({ exercise, onSubmit }: VerbExerciseProps) {
  const pronouns = Object.keys(exercise.forms);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [wrong, setWrong] = useState<string | null>(null);

  const nextPronounId = pronouns.find((p) => !answers[p]);
  const nextForm = exercise.forms[nextPronounId ?? 0];
  const isComplete = nextPronounId === undefined;

  async function handleSelect(id: string, value: string) {
    if (!nextPronounId) return;
    const result = await onSubmit({
      pronounId: nextPronounId,
      value,
    });
    if (result.answer.isCorrect) {
      setAnswers((prev) => ({
        ...prev,
        [nextPronounId]: value,
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
      activePronounId={nextPronounId}
      complete={isComplete}
      renderField={(pronounId, isActive) => (
        <VerbRow
          key={pronounId}
          form={answers[pronounId] ?? ''}
          isActive={isActive}
        />
      )}
      footer={
        !isComplete && (
          <div className='flex flex-col items-center'>
            <AnswerButton
              id={1}
              key={nextPronounId}
              onClick={() => handleSelect(nextPronounId ?? '', nextForm ?? '')}
              state={wrong === nextPronounId}
            >
              {nextForm}
            </AnswerButton>
          </div>
        )
      }
    ></VerbCardLayout>
  );
}
