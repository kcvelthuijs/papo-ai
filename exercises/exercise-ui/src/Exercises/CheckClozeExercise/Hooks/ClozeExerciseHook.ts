import { useState, useRef, useEffect } from 'react';

import {
  type CheckClozeExercise,
  type CheckClozeFeedback,
  type ExerciseExitReason,
  type ExerciseScore,
  type Cloze,
  type ClozeAnswer,
  type Phrase,
  type SpeechOptions,
} from '@workspace/dtotypes';

import {
  EXERCISE_FEEDBACK_TIME,
  type ExerciseInputState,
} from '@workspace/webtypes';
import { getRandomSpeechOption } from '../../../Components/Helpers/RandomVoice';

type ClozeFeedback = {
  answer: string;
  score: ExerciseScore;
};

type useClozeExercise = {
  exercise: CheckClozeExercise;
  onSubmit: (input: ClozeAnswer) => Promise<CheckClozeFeedback>;
  onComplete: (reason: ExerciseExitReason) => Promise<void>;
  handleAudio: (
    text: string,
    options?: SpeechOptions,
    callBack?: () => void,
  ) => Promise<void>;
};

export function useClozeExercise({
  exercise,
  onSubmit,
  onComplete,
  handleAudio,
}: useClozeExercise) {
  const [answers, setAnswers] = useState<Record<string, ClozeFeedback>>({});
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const [phraseIndex, setPhraseIndex] = useState(0);
  const [clozeIndex, setClozeIndex] = useState<number>(0);
  const [active, setActive] = useState<Cloze | undefined>(undefined);
  const [tempFocus, setFocus] = useState<string | null>(null);
  const [isComplete, setComplete] = useState<boolean>(false);
  const [busy, setBusy] = useState<boolean>(false);

  const phrase = exercise.phrases[phraseIndex];

  // -------------------------
  // PHRASE CHANGE HANDLING
  // -------------------------
  useEffect(() => {
    setClozeIndex(0);
    setComplete(false);
    setActive(undefined);
  }, [phrase]);

  // -------------------------
  // CLOZE CHANGE HANDLING
  // -------------------------
  useEffect(() => {
    const cloze = phrase?.gaps?.[clozeIndex];
    setActive(cloze);
  }, [clozeIndex, phraseIndex]);

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
    clozeId: string,
    tempFocus: string | null,
  ): ExerciseInputState {
    const baseState =
      clozeId === active?.id ? 'input' : !answers[clozeId] ? 'idle' : 'ready';
    if (tempFocus === clozeId) return 'temp';
    else return baseState;
  }

  // -------------------------
  // SUBMIT LOGIC
  // -------------------------
  async function submit(value: string) {
    const isComplete = () => {
      setComplete(true);
      setBusy(false);
    };

    if (!active) return;

    const current = active;
    const result: CheckClozeFeedback = await onSubmit({
      phraseIndex,
      clozeIndex,
      clozeId: active.id,
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

    // Show correct/incorrect
    setFocus(active.id);
    switch (result.nextAction) {
      case 'next':
        setClozeIndex((prev) => prev + 1);
        break;
      case 'next step':
        if (handleAudio !== undefined && phrase) {
          setBusy(true);
          await handleAudio(
            getFullPhraseText(phrase),
            getRandomSpeechOption(),
            isComplete,
          );
        } else isComplete();
        break;
    }

    setTimeout(() => {
      setFocus(null);
    }, EXERCISE_FEEDBACK_TIME);
    return result;
  }

  function getFullPhraseText(phrase: Phrase): string {
    const result: string[] = [];
    phrase.textParts.forEach((part, index) => {
      result.push(part);
      const gap = phrase.gaps[index];
      if (gap) {
        result.push(gap.correct);
      }
    });
    return result.join(' ');
  }

  // -------------------------
  // CONTINUE TO NEXT
  // -------------------------
  async function next() {
    if (phraseIndex < exercise.phrases.length - 1) {
      // next phrase
      setPhraseIndex((prev) => prev + 1);
    } else
      // next exercise
      await onComplete('end');
  }

  function nextPhrase() {
    setPhraseIndex((prev) => prev + 1);
  }

  // -------------------------
  // REF REGISTRATIE (voor inputs)
  // -------------------------
  function registerInputRef(clozeId: string, el: HTMLInputElement | null) {
    inputRefs.current[clozeId] = el;
  }

  // -------------------------
  // RESET (optioneel handig)
  // -------------------------
  function reset() {
    setAnswers({});
    setClozeIndex(0);
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
    clozeIndex,
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
