import { useState, useRef, useEffect } from 'react';

import {
  type CheckGapExercise,
  type CheckGapFeedback,
  type ExerciseScore,
  type Gap,
  type GapAnswer,
  type Phrase
} from '@workspace/dtotypes';

import type { GapExerciseProps } from '@exercises/logic';

import {
  EXERCISE_FEEDBACK_TIME,
  type ExerciseInputState
} from '@workspace/webtypes';

type useGapExercise = {
  exercise: CheckGapExercise;
  phraseIndex: number;
  onSubmit: (input: GapAnswer) => Promise<CheckGapFeedback>;
};

export function useGapExercise({ onSubmit }: useGapExercise) {
  const [score, setScore] = useState<Record<string, ExerciseScore>>({});
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const [phrase, setPhrase] = useState<Phrase | undefined>(undefined);
  const [gapIndex, setGapIndex] = useState<number>(0);
  const [active, setActive] = useState<Gap | undefined>(undefined);
  const [phraseIndex, setPhraseIndex] = useState<Number | undefined>();

  useEffect(() => {
    setGapIndex(0);
  }, [phrase]);

  useEffect(() => {
    const newGap = phrase?.gaps[gapIndex];
    if (!newGap) return;
    setActive(newGap);
    const gapInput = inputRefs.current[newGap.id];
    if (gapInput) {
      gapInput.focus();
    }
  }, [gapIndex]);

  // -------------------------
  // DERIVED STATE
  // -------------------------
  function getState(gapId: string): ExerciseInputState {
    if (gapId === active?.id) return 'input';
    if (!answers[gapId]) return 'idle';
    return 'ready';
  }

  // -------------------------
  // CORE SUBMIT LOGIC
  // -------------------------
  async function submit(value: string) {
    if (!active) return;

    const current = active;
    const result: CheckGapFeedback = await onSubmit({
      phraseIndex: 0,
      gapIndex,
      gapId: active.id,
      value
    });

    // score zetten (voor feedback kleur)
    setScore((prev) => ({
      ...prev,
      [current.id]: result.score
    }));

    // bij goed antwoord
    if (result.score === 'right') {
      setAnswers((prev) => ({
        ...prev,
        [current.id]: value
      }));
    }

    // tijdelijke feedback resetten
    setTimeout(() => {
      setScore((prev) => ({
        ...prev,
        [current.id]: undefined
      }));
    }, EXERCISE_FEEDBACK_TIME);

    if (result.nextAction === 'next') {
      setGapIndex(gapIndex + 1);
    }
    return result;
  }

  // -------------------------
  // REF REGISTRATIE (voor inputs)
  // -------------------------
  function registerInputRef(gapId: string, el: HTMLInputElement | null) {
    inputRefs.current[gapId] = el;
  }

  // -------------------------
  // RESET (optioneel handig)
  // -------------------------
  function reset() {
    setAnswers({});
    setScore({});
    setGapIndex(0);
  }

  // -------------------------
  // API
  // -------------------------
  return {
    // state
    active,
    answers,
    score,
    phrase,
    phraseIndex,
    gapIndex,

    // helpers
    getState,
    submit,
    registerInputRef,
    reset,

    // setters (optioneel)
    setAnswers,
    setScore,
    setPhrase
  };
}
