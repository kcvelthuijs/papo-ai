import { useState, useRef, useEffect } from 'react';

import {
  type CheckGapExercise,
  type CheckGapFeedback,
  type ExerciseExitReason,
  type ExerciseScore,
  type Gap,
  type GapAnswer,
} from '@workspace/dtotypes';

import {
  EXERCISE_FEEDBACK_TIME,
  type ExerciseInputState,
} from '@workspace/webtypes';

type GapFeedback = {
  answer: string;
  score: ExerciseScore;
};

type useGapExercise = {
  exercise: CheckGapExercise;
  onSubmit: (input: GapAnswer) => Promise<CheckGapFeedback>;
  onComplete: (reason: ExerciseExitReason) => Promise<void>;
};

export function useGapExercise({
  exercise,
  onSubmit,
  onComplete,
}: useGapExercise) {
  const [answers, setAnswers] = useState<Record<string, GapFeedback>>({});
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const [phraseIndex, setPhraseIndex] = useState(0);
  const [gapIndex, setGapIndex] = useState<number>(0);
  const [active, setActive] = useState<Gap | undefined>(undefined);
  const [tempFocus, setFocus] = useState<string | null>(null);
  const [isComplete, setComplete] = useState<boolean>(false);

  const phrase = exercise.phrases[phraseIndex];

  // -------------------------
  // PHRASE CHANGE HANDLING
  // -------------------------
  useEffect(() => {
    setGapIndex(0);
    setComplete(false);
    setActive(undefined);
  }, [phrase]);

  // -------------------------
  // GAP CHANGE HANDLING
  // -------------------------
  useEffect(() => {
    const gap = phrase?.gaps?.[gapIndex];
    setActive(gap);
  }, [gapIndex, phraseIndex]);

  // -------------------------
  // FOCUS HANDLING
  // -------------------------
  useEffect(() => {
    if (isComplete) return;
    if (!active) return;

    requestAnimationFrame(() => {
      const el = inputRefs.current[active.id];
      el?.focus();
    });
  }, [active]);

  // -------------------------
  // DERIVED STATE
  // -------------------------
  function getState(
    gapId: string,
    tempFocus: string | null,
  ): ExerciseInputState {
    const baseState =
      gapId === active?.id ? 'input' : !answers[gapId] ? 'idle' : 'ready';
    if (tempFocus === gapId) return 'temp';
    else return baseState;
  }

  // -------------------------
  // SUBMIT LOGIC
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

    // vul het antwoord in met de score
    setAnswers((prev) => ({
      ...prev,
      [current.id]: {
        answer: value,
        score: result.score,
      },
    }));

    switch (result.nextAction) {
      case 'next':
        setGapIndex((prev) => prev + 1);
        break;
      case 'next step':
        setComplete(true);
        break;
    }

    setFocus(active.id);
    setTimeout(() => {
      setFocus(null);
    }, EXERCISE_FEEDBACK_TIME);
    return result;
  }

  // -------------------------
  // CONTINUE TO NEXT
  // -------------------------
  async function next() {
    if (phraseIndex < exercise.phrases.length - 1)
      // next phrase
      setPhraseIndex((prev) => prev + 1);
    else
      // next exercise
      await onComplete('end');
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
    setGapIndex(0);
  }

  // -------------------------
  // API
  // -------------------------
  return {
    // state
    active,
    answers,
    phrase,
    phraseIndex,
    gapIndex,
    isComplete,
    tempFocus,

    // helpers
    getState,
    submit,
    registerInputRef,
    reset,

    // setters (optioneel)
    setAnswers,
    next,
  };
}
