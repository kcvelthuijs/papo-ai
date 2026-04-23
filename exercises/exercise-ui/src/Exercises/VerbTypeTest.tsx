import { useState, useRef } from 'react';

import { ExerciseInput } from '@workspace/ui';
import {
  type VerbConjugation,
  type PronounId,
  type Pronoun,
} from '@workspace/webtypes';

import { VerbCardLayout } from '../Layouts/VerbCardLayout';

type Props = {
  verb: VerbConjugation;
  description?: string;
  onRight?: (data: any) => void;
  onWrong?: (data: any) => void;
  onComplete?: () => void;
};

export function VerbTypeTest({
  verb,
  description,
  onRight,
  onWrong,
  onComplete,
}: Props) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [wrong, setWrong] = useState<string | null>(null);
  const [stars, setStars] = useState<any[]>([]);
  const starIdRef = useRef(0);
  const inputRefs = useRef<Record<string, HTMLInputElement>>({});

  const nextPronoun = Object.keys(verb.forms).find((id) => !matches[id]) as
    | PronounId
    | undefined;

  function handleRight(verb: Pronoun) {
    if (onRight) onRight(verb);
  }

  function handleWrong(verb: Pronoun) {
    if (onWrong) onWrong(verb);
  }

  function spawnStars(pronounId: PronounId, count = 3, delay = 100) {
    const rect = inputRefs.current[pronounId]?.getBoundingClientRect();
    if (!rect) return;

    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        const star = {
          id: starIdRef.current++,
          x: rect.left + Math.random() * 2 * rect.width,
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

  function checkAnswer(pronounId: PronounId) {
    const value = answers[pronounId]?.trim().toLowerCase();
    if (!value) return;
    if (value === verb.forms[pronounId]) {
      handleRight({ id: pronounId, text: value });
      const newMatches = { ...matches, [pronounId]: value };
      setMatches(newMatches);
      spawnStars(pronounId, 3, 150);
      const next = Object.keys(verb.forms).find((id) => !newMatches[id]) as
        | PronounId
        | undefined;
      if (next) setTimeout(() => inputRefs.current[next]?.focus(), 0);
    } else {
      handleWrong({ id: pronounId, text: value });
      setWrong(pronounId);
      setTimeout(() => setWrong(null), 400);
    }
  }

  return (
    <VerbCardLayout
      title={verb.infinitive}
      description={description}
      matches={matches}
      nextPronounId={nextPronoun}
      stars={stars}
      onComplete={onComplete}
      renderField={(pronounId: PronounId) => (
        <ExerciseInput
          ref={(el: HTMLInputElement | null) => {
            if (el) inputRefs.current[pronounId] = el;
          }}
          aria-label={`Conjugação de pronome ${pronounId}`}
          autoFocus={pronounId === nextPronoun}
          value={answers[pronounId] || ''}
          disabled={!!matches[pronounId]}
          size={(answers[pronounId]?.length || 1) + 1}
          state={
            wrong === pronounId
              ? 'wrong'
              : matches[pronounId]
                ? 'correct'
                : 'idle'
          }
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setAnswers((prev) => ({
              ...prev,
              [pronounId]: e.target.value,
            }))
          }
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter') {
              checkAnswer(pronounId);
            }
          }}
        />
      )}
    />
  );
}
