import { useEffect, useRef, useState } from 'react';

import { AnswerButton } from '@workspace/ui';
import type { VerbExerciseProps } from '@exercises/logic';
import {
  EXERCISE_FEEDBACK_TIME,
  type ExerciseInputState,
  type PronounId,
} from '@workspace/webtypes';

import { VerbCardLayout } from '../Layouts/VerbCardLayout';
import { ExerciseTextbox } from '../../../Components/Atoms/ExerciseTextBox';
import {
  PtPronouns,
  type CheckVerbFeedback,
  type ExerciseScore,
} from '@workspace/dtotypes';

export function VerbClickLearn({
  exercise,
  onSubmit,
  onComplete,
}: VerbExerciseProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const inputRefs = useRef<Record<string, HTMLInputElement>>({});

  const [status, setStatus] = useState<Record<string, ExerciseInputState>>({});
  const [score, setScore] = useState<Record<string, ExerciseScore>>({});
  const [queue, setQueue] = useState<PronounId[]>(PtPronouns.map((p) => p.id));
  const [isComplete, setComplete] = useState<boolean>(false);

  const inputPronoun = queue[0];
  const inputValue = inputPronoun ? exercise.forms[inputPronoun] : '';

  useEffect(() => {
    if (!queue.length) return;
    const active = queue[0];
    setStatus((prev) => ({
      ...prev,
      [active as string]: 'input',
    }));
    if (active) inputRefs.current[active]?.focus();
  }, [queue]);

  function getState(pronounId: PronounId): ExerciseInputState {
    if (inputPronoun === pronounId) return 'input';
    if (!answers[pronounId]) return 'idle';
    else return 'ready';
  }

  async function handleAnswer(id: string, value: string) {
    if (!inputPronoun) return;

    // bepaal de score
    const result: CheckVerbFeedback = await onSubmit({
      pronounId: inputPronoun,
      value,
    });

    // pas de status aan aan de hand van de score
    setScore((prev) => ({
      ...prev,
      [inputPronoun]: result.score,
    }));

    if (result.score === 'right') {
      setAnswers((prev) => ({
        ...prev,
        [inputPronoun]: value,
      }));
    }

    // Feedback is tijdelijk als je de exercise opnieuw doet
    setTimeout(() => {
      (setStatus((prev) => ({
        ...prev,
        [inputPronoun]: result.nextAction === 'next' ? 'ready' : 'input',
      })),
        setScore((prev) => ({
          ...prev,
          [inputPronoun]: undefined,
        })));
    }, EXERCISE_FEEDBACK_TIME);

    switch (result.nextAction) {
      case 'next':
        setQueue((prev) => prev.slice(1));
        break;
      case 'next exercise':
        setQueue([]);
        setComplete(true);
        break;
    }
  }

  async function handleComplete() {
    if (onComplete) await onComplete('end');
  }

  return (
    <VerbCardLayout
      title={exercise.title + ' clicklearn'}
      description={exercise.description}
      activePronounId={inputPronoun}
      isComplete={isComplete}
      onComplete={handleComplete}
      renderField={(pronounId, isActive) => (
        <ExerciseTextbox
          key={pronounId}
          form={answers[pronounId] ?? ''}
          state={getState(pronounId as PronounId)}
          score={score[pronounId]}
        />
      )}
      footer=<div className='flex flex-col items-center'>
        {!isComplete && (
          <AnswerButton
            id={1}
            key={inputPronoun}
            onClick={() => handleAnswer(inputPronoun ?? '', inputValue ?? '')}
            score={inputPronoun ? score[inputPronoun] : undefined}
          >
            {inputValue}
          </AnswerButton>
        )}
      </div>
    ></VerbCardLayout>
  );
}
