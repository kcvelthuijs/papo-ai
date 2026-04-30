import { useState, useRef, useEffect } from 'react';

import { ExerciseInputBox } from '../../../components/atoms/ExerciseInputBox';
import type { VerbExerciseProps } from '@exercises/logic';
import {
  PtPronouns,
  type PronounId,
  type ExerciseInputState,
  EXERCISE_FEEDBACK_TIME,
} from '@workspace/webtypes';

import { VerbCardLayout } from '../Layouts/VerbCardLayout';
import type { CheckVerbFeedback, ExerciseScore } from '@workspace/dtotypes';

export function VerbTypeTest({ exercise, onSubmit }: VerbExerciseProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const inputRefs = useRef<Record<string, HTMLInputElement>>({});

  const [status, setStatus] = useState<Record<string, ExerciseInputState>>({});
  const [score, setScore] = useState<Record<string, ExerciseScore>>({});
  const [queue, setQueue] = useState<PronounId[]>(PtPronouns.map((p) => p.id));

  const inputPronoun = queue[0];

  const [stars, setStars] = useState<any[]>([]);
  const starIdRef = useRef(0);

  useEffect(() => {
    if (!queue.length) return;

    // haal het pers.vnw van de queue, markeer het als input en geef focus
    const active = queue[0];
    setStatus((prev) => ({
      ...prev,
      [active as string]: 'input',
    }));
    if (active) inputRefs.current[active]?.focus();
  }, [queue]);

  function getState(pronounId: PronounId): ExerciseInputState {
    if (pronounId === inputPronoun) return 'input';
    if (!answers[pronounId]) return 'idle';
    else return 'ready';
  }

  function spawnStars(pronounId: PronounId, count = 3, delay = 100) {
    const rect = inputRefs.current[pronounId]?.getBoundingClientRect();
    if (!rect) return;

    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        const star = {
          id: starIdRef.current++,
          x: rect.left + Math.random() * 2 * rect.width - rect.width / 2,
          y: rect.top + (Math.random() * rect.height) / 2,
          rotation: Math.random() * 360,
          scale: 0.4 + Math.random() * 0.4,
        };
        setStars((s) => [...s, star]);
        setTimeout(() => {
          setStars((s) => s.filter((x) => x.id !== star.id));
        }, 600);
      }, i * delay);
    }
  }

  function handleChange(pronounId: string, value: string) {
    setAnswers((prev) => ({
      ...prev,
      [pronounId]: value,
    }));
  }

  async function handleAnswer(pronounId: string) {
    const value = answers[pronounId]?.trim();
    if (!value) return;

    // bepaal de score
    const result: CheckVerbFeedback = await onSubmit({
      pronounId,
      value,
    });

    // werk de score bij
    setScore((prev) => ({
      ...prev,
      [pronounId]: result.score,
    }));

    // verwerk het goede antwoord
    if (result.score === 'right') {
      setAnswers((prev) => ({
        ...prev,
        [inputPronoun as string]: value,
      }));
      // advance to next pronoun
      setQueue((prev) => prev.slice(1));
      // met sterretjes
      spawnStars(pronounId as PronounId, 3, 150);
    }

    // Feedback is maar tijdelijk
    setTimeout(() => {
      (setStatus((prev) => ({
        ...prev,
        [pronounId]: 'input',
      })),
        setScore((prev) => ({
          ...prev,
          [pronounId]: undefined,
        })));
    }, EXERCISE_FEEDBACK_TIME);
  }

  return (
    <VerbCardLayout
      title={exercise.title}
      description={exercise.description}
      activePronounId={inputPronoun}
      stars={stars}
      renderField={(pronounId: string, isActive) => (
        <ExerciseInputBox
          ref={(el: HTMLInputElement | null) => {
            if (el) inputRefs.current[pronounId] = el;
          }}
          key={pronounId}
          aria-label={`label-${pronounId}`}
          value={answers[pronounId] || ''}
          disabled={pronounId != inputPronoun}
          size={Math.max(
            ...Object.values(exercise.forms).map((v: any) => v.length),
          )}
          state={getState(pronounId as PronounId)}
          score={score[pronounId]}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            handleChange(pronounId, e.target.value);
          }}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter') {
              handleAnswer(pronounId);
            }
          }}
        />
      )}
    />
  );
}
