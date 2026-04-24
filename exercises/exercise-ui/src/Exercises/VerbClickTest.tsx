import { useState } from 'react';
import { shuffle } from '@workspace/ui';

import { VerbCardLayout } from '../Layouts/VerbCardLayout';
import { type VerbExerciseProps } from '@exercises/logic';
import type { PronounId } from '@workspace/dtotypes';

export function VerbClickTest({ exercise, onSubmit }: VerbExerciseProps) {
  const [feedback, setFeedback] = useState<Record<string, any>>({});
  const [selected, setSelected] = useState<Record<string, string>>({});

  const pronouns = Object.keys(exercise.verb.forms);

  const [forms, setForms] = useState(() =>
    shuffle(
      Object.entries(exercise.verb.forms).map(([id, text]) => ({
        id,
        text
      }))
    )
  );

  const [matches, setMatches] = useState<Record<string, string>>({});
  const [wrong, setWrong] = useState<string | null>(null);

  // 🔥 cruciaal: wie is aan de beurt?
  const nextPronounId = pronouns.find((id) => !matches[id]);

  async function handleSelect(formId: string) {
    if (!nextPronounId) return;

    const form = forms.find((f) => f.id === formId);
    if (!form) return;

    const result = await onSubmit({
      pronounId: nextPronounId,
      value: form.text
    });

    if (result.isCorrect) {
      // ✔ correct → match opslaan
      setMatches((prev) => ({
        ...prev,
        [nextPronounId]: formId
      }));

      // ✔ optie verwijderen (zoals vroeger)
      setForms((prev) => prev.filter((f) => f.id !== formId));
    } else {
      // ❌ fout → feedback
      setWrong(formId);
      setTimeout(() => setWrong(null), 400);
    }
  }

  return (
    <VerbCardLayout
      title={exercise.title}
      description={exercise.description}
      nextPronounId={nextPronounId}
      matches={matches}
      renderField={(pronounId: PronounId) => {
        const matched = matches[pronounId];
        return matched ? <p>{exercise.verb.forms[pronounId]}</p> : null;
      }}
    >
      <div className='flex flex-col items-center'>
        <div className='wrap mt-2 flex flex-row flex-wrap justify-center gap-2'>
          {forms.map((f) => (
            <button
              key={f.id}
              onClick={() => handleSelect(f.id)}
              className={`
                px-3 py-1 border rounded transition
                ${wrong === f.id ? 'border-red-500 bg-red-50' : ''}
              `}
            >
              {f.text}
            </button>
          ))}
        </div>
      </div>
    </VerbCardLayout>
  );
}
