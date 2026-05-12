import { useEffect, useRef, useState } from 'react';

import {
  PtPronouns,
  type CheckVerbFeedback,
  type ExerciseExitReason,
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
  onComplete: (readon: ExerciseExitReason) => Promise<void>;
};

export function useVerbExercise({
  onSubmit,
  onComplete,
}: UseVerbExerciseParams) {
  // -------------------------
  // STATE
  // -------------------------
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [score, setScore] = useState<Record<string, ExerciseScore>>({});
  const [status, setStatus] = useState<Record<string, ExerciseInputState>>({});
  const [queue, setQueue] = useState<PronounId[]>(PtPronouns.map((p) => p.id));
  const [isComplete, setComplete] = useState<boolean>(false);

  // refs voor focus (alleen nodig bij input-based exercises)
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const active = queue[0];

  // -------------------------
  // FOCUS HANDLING
  // -------------------------
  useEffect(() => {
    setComplete(queue.length === 0);
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

    switch (result.nextAction) {
      case 'next':
        setQueue((prev) => prev.slice(1));
        break;
      case 'restart':
        reset();
        break;
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
