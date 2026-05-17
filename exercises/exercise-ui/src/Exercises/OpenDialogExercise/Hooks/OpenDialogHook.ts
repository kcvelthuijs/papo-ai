import { useEffect, useState } from 'react';

import type {
  OpenExercise,
  OpenExerciseFeedback,
  ExerciseExitReason,
} from '@workspace/dtotypes';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export type WordState = {
  used: boolean;
  responseId: string;
};

type UseOpenDialogParams = {
  exercise: OpenExercise;
  onSubmit: (answer: string) => Promise<OpenExerciseFeedback>;
  onComplete: (reason: ExerciseExitReason) => Promise<void>;
};

export function useOpenDialogHook({
  exercise,
  onSubmit,
  onComplete,
}: UseOpenDialogParams) {
  // -------------------------
  // STATE
  // -------------------------
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: exercise.introduction ?? '',
    },
  ]);

  const [isComplete, setIsComplete] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [conversationId, setConversationId] = useState<string>('');
  const [responseId, setResponseId] = useState<string>('');

  const [usedWords, setUsedWords] = useState<Record<string, WordState>>({});
  const [feedback, setFeedback] = useState<OpenExerciseFeedback | null>(null);

  // -------------------------
  // START CONVERSATION
  // -------------------------
  useEffect(() => {
    const startConversation = async () => {
      setConversationId('12345');
    };
    startConversation();
  }, []);

  // -------------------------
  // CHECK COMPLETE
  // -------------------------
  useEffect(() => {
    const allUsed = (exercise.words ?? []).every(
      (w: string) => usedWords[w.toLowerCase()]?.used,
    );
    if (allUsed) setIsComplete(true);
  }, [usedWords]);

  // -------------------------
  // WORDS STATUS
  // -------------------------
  const words = (exercise.words ?? []).map((w: string) => {
    const key = w.toLowerCase();
    const state = usedWords[key];

    return {
      word: w,
      used: !!state?.used,
      responseId: state?.responseId,
    };
  });

  // -------------------------
  // CHECK WORDS
  // -------------------------
  function markWordsUsed(text: string, responseId: string) {
    const normalized = text
      .toLowerCase()
      .split(/\s+/)
      .map((w) => w.replace(/[.,!?]/g, ''));
    setUsedWords((prev) => {
      const next = { ...prev };
      for (const word of exercise.words ?? []) {
        if (normalized.includes(word.toLowerCase())) {
          next[word.toLowerCase()] = { used: true, responseId };
        }
      }
      return next;
    });
  }

  // -------------------------
  // SUBMIT ANSWER
  // -------------------------
  async function submit(value: string) {
    if (isComplete || isSubmitting) return;

    const userMessage: Message = {
      role: 'user' as const,
      content: value,
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsSubmitting(true);

    try {
      const result = await onSubmit(value);
      setFeedback(result);

      const assistantMessage: Message = {
        role: 'assistant',
        content: result.feedback,
      };

      setMessages((prev) => [...prev, assistantMessage]);
      markWordsUsed(value, responseId);

      return result;
    } finally {
      setIsSubmitting(false);
    }
  }

  // -------------------------
  // COMPLETE EXERCISE
  // -------------------------
  async function complete(reason: ExerciseExitReason = 'end') {
    setIsComplete(true);
    await onComplete(reason);
  }

  // -------------------------
  // RESET
  // -------------------------
  function reset() {
    setMessages([
      {
        role: 'assistant',
        content: exercise.introduction ?? '',
      },
    ]);
    setFeedback(null);
    setIsComplete(false);
    setIsSubmitting(false);
  }

  // -------------------------
  // API
  // -------------------------
  return {
    // state
    messages,
    feedback,
    isComplete,
    isSubmitting,
    words,

    // actions
    submit,
    complete,
    reset,
  };
}
