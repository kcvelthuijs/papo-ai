import { useState } from 'react';

import { shuffle } from '@workspace/ui/lib/shuffle';
import { AnswerButton } from '@workspace/ui';
import { type VerbExerciseProps } from '@exercises/logic';
import {
  type ExerciseInputState,
  type PronounId,
  type VerbFormRow,
  buildVerbForms
} from '@workspace/webtypes';

import { ExerciseTextbox } from '../../../Components/Atoms/ExerciseTextBoxes';
import { VerbCardLayout } from '../Layouts/VerbCardLayout';

export function VerbClickTest({ exercise, onSubmit }: VerbExerciseProps) {
  const pronouns = Object.keys(exercise.forms);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [wrong, setWrong] = useState<string | null>(null);

  // Maak een lijst met alle gegevens van vervoegingen
  const [vervoeging, setVervoeging] = useState(
    shuffle(buildVerbForms(exercise))
  );

  // Bepaal de actieve vervoeging
  const nextPronoun = pronouns.find((p) => !answers[p]);

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
      value
    });
    if (result.answer.isCorrect) {
      setAnswers((prev) => ({
        ...prev,
        [nextPronoun]: value
      }));
      // verwijder gebruikte optie
      setVervoeging((v) => v.filter((v) => v.id !== id));
    } else {
      setWrong(id);
      setTimeout(() => setWrong(null), 600);
    }
  }

  const isComplete = vervoeging.length === 0;

  return (
    <VerbCardLayout
      title={exercise.title}
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
          <div className='flex flex-wrap gap-2 justify-center'>
            {vervoeging.map((v: VerbFormRow) => (
              <AnswerButton
                id={v.id}
                key={v.id}
                onClick={() => handleSelect(v.id, v.form)}
                state={wrong === v.id}
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
