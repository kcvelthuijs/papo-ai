import { useEffect, useRef, useState } from 'react';

import { shuffle } from '@workspace/ui/lib/shuffle';
import { AnswerButton } from '@workspace/ui';
import { type VerbExerciseProps } from '@exercises/logic';
import {
  EXERCISE_FEEDBACK_TIME,
  type ExerciseInputState,
  type PronounId,
  type VerbFormRow,
  buildVerbForms,
} from '@workspace/webtypes';

import { ExerciseTextbox } from '../../../components/atoms/ExerciseTextBox';
import { VerbCardLayout } from '../Layouts/VerbCardLayout';
import {
  PtPronouns,
  type CheckVerbFeedback,
  type ExerciseScore,
} from '@workspace/dtotypes';

export function VerbClickTest({ exercise, onSubmit }: VerbExerciseProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const inputRefs = useRef<Record<string, HTMLInputElement>>({});

  const [status, setStatus] = useState<Record<string, ExerciseInputState>>({});
  const [score, setScore] = useState<Record<string, ExerciseScore>>({});
  const [queue, setQueue] = useState<PronounId[]>(PtPronouns.map((p) => p.id));

  const inputPronoun = queue[0];

  // Maak een lijst met alle gegevens van vervoegingen
  const [vervoeging, setVervoeging] = useState(
    shuffle(buildVerbForms(exercise)),
  );

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

    // request feedback on the answer
    const result: CheckVerbFeedback = await onSubmit({
      pronounId: inputPronoun,
      value,
    });

    // verwerk de score
    setScore((prev) => ({
      ...prev,
      [inputPronoun]: result.score,
    }));

    // process the answer
    if (result.score === 'right') {
      setAnswers((prev) => ({
        ...prev,
        [inputPronoun as string]: value,
      }));

      // verwijder gebruikte optie
      setVervoeging((v) => v.filter((v) => v.id !== id));

      // verwijder deze input van de queue
      setQueue((prev) => prev.slice(1));
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
  }

  const isComplete = vervoeging.length === 0;

  return (
    <VerbCardLayout
      title={exercise.title}
      description={exercise.description}
      activePronounId={inputPronoun}
      complete={isComplete}
      renderField={(pronounId, isActive) => (
        <ExerciseTextbox
          key={pronounId}
          aria-label={`label-${pronounId}`}
          form={answers[pronounId] ?? ''}
          state={getState(pronounId as PronounId)}
          score={score[pronounId]}
        />
      )}
      footer={
        !isComplete && (
          <div className='flex flex-wrap gap-2 justify-center'>
            {vervoeging.map((v: VerbFormRow) => (
              <AnswerButton
                id={v.id}
                key={v.id}
                onClick={() => handleAnswer(v.id, v.form)}
                score={inputPronoun ? score[inputPronoun] : undefined}
              >
                {v.form}
              </AnswerButton>
            ))}
          </div>
        )
      }
    ></VerbCardLayout>
  );
}
