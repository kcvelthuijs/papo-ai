import { useState, useRef, useEffect } from 'react';

import {
  type CheckGapExercise,
  type CheckGapFeedback,
  type ExerciseScore,
  type Gap,
  type GapAnswer,
  type Phrase,
} from '@workspace/dtotypes';

import {
  EXERCISE_FEEDBACK_TIME,
  type ExerciseInputState,
} from '@workspace/webtypes';

type useGapExercise = {
  exercise: CheckGapExercise;
  phraseIndex: number;
  onSubmit: (input: GapAnswer) => Promise<CheckGapFeedback>;
};

export function useGapExercise({ exercise, onSubmit }: useGapExercise) {
  const [score, setScore] = useState<Record<string, ExerciseScore>>({});
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const [phraseIndex, setPhraseIndex] = useState(0);
  const [gapIndex, setGapIndex] = useState<number>(0);
  const [isComplete, setComplete] = useState<boolean>(false);
  const [active, setActive] = useState<Gap | undefined>(undefined);
  const phrase = exercise.phrases[phraseIndex];

  useEffect(() => {
    setGapIndex(0);
    setComplete(false);
  }, [phrase]);

  useEffect(() => {
    if (phrase) setActive(phrase.gaps[gapIndex]);
  }, [gapIndex]);

  useEffect(() => {
    if (isComplete) return;
    if (!active) return;

    requestAnimationFrame(() => {
      console.log('requestAnimationFrame');
      const el = inputRefs.current[active.id];
      el?.focus();
    });
  }, [active]);

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
      phraseIndex,
      gapIndex,
      gapId: active.id,
      value,
    });

    // score zetten (voor feedback kleur)
    setScore((prev) => ({
      ...prev,
      [current.id]: result.score,
    }));

    // bij goed antwoord
    if (result.score === 'right') {
      setAnswers((prev) => ({
        ...prev,
        [current.id]: value,
      }));
    }

    // tijdelijke feedback resetten
    setTimeout(() => {
      setScore((prev) => ({
        ...prev,
        [current.id]: undefined,
      }));
    }, EXERCISE_FEEDBACK_TIME);

    switch (result.nextAction) {
      case 'next':
        setGapIndex(gapIndex + 1);
        break;
      case 'next step':
        setComplete(true);
        break;
    }
    return result;
  }

  function nextStep() {
    setPhraseIndex(phraseIndex + 1);
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
    isComplete,

    // helpers
    getState,
    submit,
    registerInputRef,
    reset,

    // setters (optioneel)
    setAnswers,
    setScore,
    nextStep,
  };
}
