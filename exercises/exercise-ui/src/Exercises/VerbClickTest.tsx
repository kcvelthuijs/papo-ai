import { useState } from 'react';
import { shuffle } from '@workspace/ui/lib/shuffle';
import { AnswerButton } from '@workspace/ui';
import { type VerbExerciseProps } from '@exercises/logic';

import { VerbCardLayout } from '../Layouts/VerbCardLayout';
import type { Pronoun } from '@workspace/dtotypes';

export function VerbClickTest({ exercise, onSubmit }: VerbExerciseProps) {
  const pronouns = Object.keys(exercise.verb.forms);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [wrong, setWrong] = useState<string | null>(null);
  const [options, setOptions] = useState(() =>
    shuffle(Object.values(exercise.verb.forms))
  );

  const nextPronoun = pronouns.find((p) => !answers[p]);

  async function handleSelect(value: string) {
    if (!nextPronoun) return;

    const result = await onSubmit({
      pronounId: nextPronoun,
      value
    });

    if (result.isCorrect) {
      setAnswers((prev) => ({
        ...prev,
        [nextPronoun]: value
      }));

      // verwijder gebruikte optie
      setOptions((prev) => prev.filter((o) => o !== value));
    } else {
      setWrong(value);
      setTimeout(() => setWrong(null), 400);
    }
  }

  const isComplete = Object.keys(answers).length === pronouns.length;

  return (
    <VerbCardLayout
      title={exercise.title}
      description={exercise.description}
      activePronounId={nextPronoun}
      renderField={(pronounId) => (
        <span className='w-min-12 items-start rounded-sm p-2 transition'>
          {answers[pronounId]}
        </span>
      )}
      footer={
        !isComplete && (
          <div className='flex flex-wrap gap-2 justify-center'>
            {options.map((option) => (
              <AnswerButton
                key={option}
                onClick={() => handleSelect(option as string)}
                state={wrong === option}
              >
                {option}
              </AnswerButton>
            ))}
          </div>
        )
      }
    ></VerbCardLayout>
  );
}
