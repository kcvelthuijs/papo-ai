import { useState, useRef, useEffect } from 'react';

import { ExerciseInputBox } from '../../../Components/Atoms/ExerciseTextBoxes';
import type { VerbExerciseProps } from '@exercises/logic';
import {
  PtPronouns,
  type PronounId,
  type ExerciseInputState
} from '@workspace/webtypes';

import { VerbCardLayout } from '../Layouts/VerbCardLayout';

export function VerbTypeTest({ exercise, onSubmit }: VerbExerciseProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const inputRefs = useRef<Record<string, HTMLInputElement>>({});

  const [status, setStatus] = useState<Record<string, ExerciseInputState>>({});
  const [queue, setQueue] = useState<PronounId[]>(PtPronouns.map((p) => p.id));
  const nextPronoun = queue[0];

  const [stars, setStars] = useState<any[]>([]);
  const starIdRef = useRef(0);

  useEffect(() => {
    if (!queue.length) return;
    const active = queue[0];
    if (active) inputRefs.current[active]?.focus();
  }, [queue]);

  function getState(pronounId: PronounId): ExerciseInputState {
    switch (status[pronounId]) {
      case 'wrong':
        return 'wrong';
      case 'correct':
        return 'correct';
      default:
        if (pronounId === nextPronoun) return 'input';
        else return 'idle';
    }
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
          scale: 0.4 + Math.random() * 0.4
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
      [pronounId]: value
    }));
  }

  async function handleAnswer(pronounId: string) {
    const value = answers[pronounId]?.trim();
    if (!value) return;

    // bepaal de score
    const result = await onSubmit({
      pronounId,
      value
    });

    // Pas de status aan
    const isCorrect = result.answer.isCorrect;
    setStatus((prev) => ({
      ...prev,
      [pronounId]: isCorrect ? 'correct' : 'wrong'
    }));

    if (isCorrect) {
      spawnStars(pronounId as PronounId, 3, 150);
      setQueue((prev) => prev.slice(1));
    } else {
      setTimeout(
        () =>
          setStatus((prev) => ({
            ...prev,
            [pronounId]: 'input'
          })),
        600
      );
    }
  }

  return (
    <VerbCardLayout
      title={exercise.title}
      description={exercise.description}
      activePronounId={nextPronoun}
      stars={stars}
      renderField={(pronounId: string, isActive) => (
        <ExerciseInputBox
          ref={(el: HTMLInputElement | null) => {
            if (el) inputRefs.current[pronounId] = el;
          }}
          aria-label={`Conjugação de pronome ${pronounId}`}
          autoFocus={isActive}
          value={answers[pronounId] || ''}
          disabled={pronounId != nextPronoun}
          size={Math.max(
            ...Object.values(exercise.forms).map((v: any) => v.length)
          )}
          state={getState(pronounId as PronounId)}
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
