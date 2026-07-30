import { useState, useRef, useEffect } from 'react';

import {
  EXERCISE_FEEDBACK_TIME,
  type ExerciseInputState,
} from '@workspace/webtypes';

import type {
  ExerciseExitReason,
  ExerciseScore,
  CardAnswer,
  CardExercise,
  CardFeedback,
  CardItem,
  SpeechOptions,
} from '@workspace/dtotypes';
import { getRandomSpeechOption } from '../../../Components/Helpers/RandomVoice';

type ItemFeedback = {
  givenAnswer: string;
  correctAnswer: string;
  score: ExerciseScore;
};

type useCardProps = {
  exercise: CardExercise;
  onSubmit: (input: CardAnswer) => Promise<CardFeedback>;
  onComplete: (reason: ExerciseExitReason) => Promise<void>;
  handleAudio: (
    text: string,
    options?: SpeechOptions,
    callback?: () => void,
  ) => Promise<void>;
};

export function useCardExercise({
  exercise,
  onSubmit,
  onComplete,
  handleAudio,
}: useCardProps) {
  const [answers, setAnswers] = useState<Record<string, ItemFeedback>>({});
  const [itemIndex, setItemIndex] = useState(0);
  const [tempFocus, setFocus] = useState<string | null>(null);
  const [isComplete, setComplete] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const active = exercise.items[itemIndex];

  // -------------------------
  // COMPLETION CHECK
  // -------------------------
  useEffect(() => {
    if (itemIndex >= exercise.items.length) {
      setComplete(true);
    }
  }, [itemIndex, exercise.items.length]);

  // -------------------------
  // FOCUS HANDLING
  // -------------------------
  useEffect(() => {
    if (isComplete) return;
    if (!active) return;

    requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
  }, [active, isComplete]);

  // -------------------------
  // DERIVED STATE
  // -------------------------
  function getState(itemId: string, temp: string | null) {
    const base =
      itemId === active?.id ? 'input' : !answers[itemId] ? 'idle' : 'ready';
    return temp === itemId ? 'temp' : base;
  }

  // -------------------------
  // SUBMIT LOGIC
  // -------------------------
  async function submit(value: string) {
    if (!active) return;

    const current = active;
    const result: CardFeedback = await onSubmit({
      id: active.id ?? '',
      value,
    });

    // vul het antwoord in met de score
    setAnswers((prev) => ({
      ...prev,
      [current.id]: {
        givenAnswer: result.givenAnswer,
        correctAnswer: result.correctAnswer,
        score: result.score,
      },
    }));

    setFocus(active.id);
    setTimeout(() => {
      setFocus(null);
    }, EXERCISE_FEEDBACK_TIME);

    if (result.nextAction === 'next step' || result.nextAction === 'next exercise') {
      if (handleAudio !== undefined)
        await handleAudio(
          active?.response ?? '',
          getRandomSpeechOption(),
          afterSubmit,
        );
      else afterSubmit();
      if (result.nextAction === 'next exercise') setComplete(true);
    }
    return result;
  }

  // -------------------------
  // AFTER SUBMIT
  // -------------------------
  function afterSubmit() {
    setTimeout(() => {
      setItemIndex((i) => i + 1);
    }, EXERCISE_FEEDBACK_TIME);
  }

  // -------------------------
  // CONTINUE TO NEXT
  // -------------------------
  async function next() {
    await onComplete('end');
  }

  // -------------------------
  // RESET (optioneel handig)
  // -------------------------
  function reset() {
    setItemIndex(0);
    setAnswers({});
    setFocus(null);
    setComplete(false);
  }

  // -------------------------
  // API
  // -------------------------
  return {
    // state
    active,
    answers,
    itemIndex,
    isComplete,
    tempFocus,
    inputRef,

    // helpers
    getState,
    submit,

    // setters (optioneel)
    setAnswers,
    next,
    reset,
  };
}
