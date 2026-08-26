import { useLessonStore } from '@workspace/controllers';
import type {
  CardAnswer,
  CardExercise,
  CardFeedback,
  ChatAnswer,
  ChatExercise,
  ChatExerciseFeedback,
  CheckClozeExercise,
  CheckClozeFeedback,
  CheckVerbExercise,
  CheckVerbFeedback,
  Exercise,
  ExerciseEvaluation,
  ExerciseScore,
} from '@workspace/dtotypes';

import { PtPronouns } from '@workspace/dtotypes';

export type LessonResult = {
  lessonId: number;
  seqIndex: number;
  question: number;
  givenAnswer: string;
  correctAnswer: string;
  score: ExerciseScore;
};

export function ProcessLessonResults(): LessonResult[] {
  const { exercises, results } = useLessonStore.getState();

  const getExerciseResult = (
    exercise: Exercise,
    answer: ExerciseEvaluation,
  ): LessonResult => {
    switch (exercise.type) {
      case 'verb-click-learn':
      case 'verb-click-test':
      case 'verb-type-test':
        return getVerbLessonResult(exercise, answer);

      case 'cloze-click-test':
      case 'cloze-type-test':
        return getClozeLessonResult(exercise, answer);

      case 'card-type-test':
      case 'card-click-learn':
        return getCardLessonResult(exercise, answer);

      case 'open-dialog':
        return getChatLessonResult(exercise, answer);
    }
    return {
      lessonId: exercise.lessonId,
      seqIndex: exercise.seqNumber,
      question: -1,
      givenAnswer: '',
      correctAnswer: '',
      score: undefined,
    } as LessonResult;
  };

  const createReactSpan = (text: string): string => {
    return `[[${text}]]`;
  };

  const getCardLessonResult = (
    exercise: Exercise,
    answer: ExerciseEvaluation,
  ): LessonResult => {
    const e = exercise as CardExercise;
    const a = answer as CardFeedback;
    return {
      lessonId: e.lessonId,
      seqIndex: e.seqNumber,
      question: a.question,
      givenAnswer: a.givenAnswer,
      correctAnswer: createReactSpan(a.correctAnswer),
      score: a.score,
    };
  };

  const getClozeLessonResult = (
    exercise: Exercise,
    answer: ExerciseEvaluation,
  ): LessonResult => {
    const e = exercise as CheckClozeExercise;
    const a = answer as CheckClozeFeedback;
    return {
      lessonId: e.lessonId,
      seqIndex: e.seqNumber,
      question: a.question,
      givenAnswer: a.value,
      correctAnswer: createReactSpan(a.correctValue ?? ''),
      score: a.score,
    };
  };

  const getVerbLessonResult = (
    exercise: Exercise,
    answer: ExerciseEvaluation,
  ): LessonResult => {
    const e = exercise as CheckVerbExercise;
    const a = answer as CheckVerbFeedback;
    const pronoun =
      PtPronouns.find((p) => p.id == a.answer.pronounId)?.text ?? 'todos';
    const correctAnswer = `${pronoun} ${createReactSpan(a.correctValue)}`;
    return {
      lessonId: e.lessonId,
      seqIndex: e.seqNumber,
      question: a.question,
      givenAnswer: `${a.answer.value}`,
      correctAnswer: correctAnswer,
      score: a.score,
    };
  };

  const getChatLessonResult = (
    exercise: Exercise,
    answer: ExerciseEvaluation,
  ): LessonResult => {
    const e = exercise as ChatExercise;
    const a = answer as ChatExerciseFeedback;
    return {
      lessonId: e.lessonId,
      seqIndex: e.seqNumber,
      question: a.question,
      givenAnswer: `${a.response}`,
      correctAnswer: '',
      score: a.score,
    };
  };

  // Vertaal de results van de exercises naar uniforme LessonResults
  return exercises.flatMap((e) =>
    results
      .filter((r) => r.lessonId === e.lessonId && r.seqNumber === e.seqNumber)
      .map((r) => getExerciseResult(e, r)),
  );
}
