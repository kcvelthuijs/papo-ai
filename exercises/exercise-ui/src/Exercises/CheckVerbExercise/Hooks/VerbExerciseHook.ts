import { useEffect, useRef, useState } from 'react';

import {
  PtPronouns,
  type CheckVerbFeedback,
  type ExerciseScore,
} from '@workspace/dtotypes';

import {
  EXERCISE_FEEDBACK_TIME,
  type ExerciseInputState,
  type PronounId,
} from '@workspace/webtypes';

type UseVerbExerciseParams = {
  onSubmit: (input: {
    pronounId: PronounId;
    value: string;
  }) => Promise<CheckVerbFeedback>;
};

export function useVerbExercise({ onSubmit }: UseVerbExerciseParams) {
  // -------------------------
  // STATE
  // -------------------------
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [score, setScore] = useState<Record<string, ExerciseScore>>({});
  const [status, setStatus] = useState<Record<string, ExerciseInputState>>({});
  const [queue, setQueue] = useState<PronounId[]>(PtPronouns.map((p) => p.id));

  // refs voor focus (alleen nodig bij input-based exercises)
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const active = queue[0];
  const isComplete = queue.length === 0;

  // -------------------------
  // FOCUS HANDLING
  // -------------------------
  useEffect(() => {
    if (!active) return;
    const el = inputRefs.current[active];
    if (el) {
      el.focus();
    }
  }, [active]);

  // -------------------------
  // DERIVED STATE
  // -------------------------
  function getState(pronounId: PronounId): ExerciseInputState {
    if (pronounId === active) return 'input';
    if (!answers[pronounId]) return 'idle';
    return 'ready';
  }

  // -------------------------
  // CORE SUBMIT LOGIC
  // -------------------------
  async function submit(value: string) {
    if (!active) return;

    const current = active;
    const result: CheckVerbFeedback = await onSubmit({
      pronounId: current,
      value,
    });

    // score zetten (voor feedback kleur)
    setScore((prev) => ({
      ...prev,
      [current]: result.score,
    }));

    // bij goed antwoord
    if (result.score === 'right') {
      setAnswers((prev) => ({
        ...prev,
        [current]: value,
      }));
    }

    // tijdelijke feedback resetten
    setTimeout(() => {
      setScore((prev) => ({
        ...prev,
        [current]: undefined,
      }));
    }, EXERCISE_FEEDBACK_TIME);

    if (result.nextAction === 'next') {
      setQueue((prev) => prev.slice(1));
    }
    if (result.nextAction == 'restart') {
      reset();
    }
    return result;
  }

  // -------------------------
  // REF REGISTRATIE (voor inputs)
  // -------------------------
  function registerInputRef(pronounId: PronounId, el: HTMLInputElement | null) {
    inputRefs.current[pronounId] = el;
  }

  // -------------------------
  // RESET (optioneel handig)
  // -------------------------
  function reset() {
    setAnswers({});
    setScore({});
    setQueue(PtPronouns.map((p) => p.id));
  }

  // -------------------------
  // API
  // -------------------------
  return {
    // state
    active,
    isComplete,
    answers,
    score,
    queue,

    // helpers
    getState,
    submit,
    registerInputRef,
    reset,

    // setters (optioneel)
    setAnswers,
    setScore,
    setQueue,
  };
}
