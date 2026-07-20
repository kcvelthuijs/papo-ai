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

type VerbFeedback = {
  answer: string;
  score: ExerciseScore;
};

type UseVerbExerciseParams = {
  onSubmit: (input: {
    pronounId: PronounId;
    value: string;
  }) => Promise<CheckVerbFeedback>;
  onComplete: (readon: ExerciseExitReason) => Promise<void>;
  handleAudio: (text: string, callback: () => void) => Promise<void>;
};

export function useVerbExercise({
  onSubmit,
  onComplete,
  handleAudio,
}: UseVerbExerciseParams) {
  // -------------------------
  // STATE
  // -------------------------
  const [answers, setAnswers] = useState<Record<string, VerbFeedback>>({});
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const [queue, setQueue] = useState<PronounId[]>(PtPronouns.map((p) => p.id));
  const [tempFocus, setFocus] = useState<string | null>(null);
  const [isComplete, setComplete] = useState<boolean>(false);
  const [busy, setBusy] = useState<boolean>(false);

  const active = queue[0];

  // -------------------------
  // FOCUS HANDLING
  // -------------------------
  useEffect(() => {
    setComplete(queue.length < 1);
    if (!active) return;
    const el = inputRefs.current[active];
    if (el) {
      requestAnimationFrame(() => {
        inputRefs.current[active]?.focus();
      });
    }
  }, [active, queue.length]);

  // -------------------------
  // DERIVED STATE
  // -------------------------
  function getState(
    pronounId: PronounId,
    tempFocus: string | null,
  ): ExerciseInputState {
    const baseState =
      pronounId === active ? 'input' : !answers[pronounId] ? 'idle' : 'ready';
    if (tempFocus == pronounId) return 'temp';
    else return baseState;
  }

  // -------------------------
  // SUBMIT LOGIC
  // -------------------------
  async function submit(value: string) {
    const audioReady = () => {
      setBusy(false);
    };
    if (!active) return;

    const current = active;
    const result: CheckVerbFeedback = await onSubmit({
      pronounId: current,
      value,
    });

    // score zetten (voor feedback kleur)
    setAnswers((prev) => ({
      ...prev,
      [current]: { answer: value, score: result.score },
    }));

    setFocus(current);
    setTimeout(() => {
      setFocus(null);
    }, EXERCISE_FEEDBACK_TIME);

    if (result.score !== 'wrong' && handleAudio !== undefined) {
      setBusy(true);
      const pronoun = PtPronouns.find((p) => p.id == active);
      if (pronoun) await handleAudio(`${pronoun.text} ${value}`, audioReady);
    }

    switch (result.nextAction) {
      case 'next':
        setQueue((prev) => prev.slice(1));
        break;
      case 'next exercise':
        setComplete(true);
        break;
      case 'restart':
        reset();
        break;
    }

    return result;
  }

  // -------------------------
  // CONTINUE TO NEXT
  // -------------------------
  async function next() {
    await onComplete('end');
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
    setQueue(PtPronouns.map((p) => p.id));
    setFocus(null);
  }

  // -------------------------
  // API
  // -------------------------
  return {
    // state
    active,
    answers,
    queue,
    isComplete,
    tempFocus,
    busy,

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
