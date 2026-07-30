import { useLessonStore } from '@workspace/controllers';
import type {
  CardAnswer,
  CardExercise,
  CardFeedback,
  CheckClozeExercise,
  CheckClozeFeedback,
  CheckVerbExercise,
  CheckVerbFeedback,
  Exercise,
  ExerciseEvaluation,
  ExerciseScore
} from '@workspace/dtotypes';

export type LessonResult = {
  givenAnswer: string;
  correctAnswer: string;
  score: ExerciseScore;
};

export type LessonSummary = {
  correctAnswer: string;
  countAnswers: number;
  result: string;
};

export function ProcessLessonResults(): LessonSummary[] {
  const { exercises, results } = useLessonStore.getState();

  const getExerciseResult = (
    exercise: Exercise,
    answer: ExerciseEvaluation
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
    }
    return {
      givenAnswer: '',
      correctAnswer: '',
      score: 'partial'
    } as LessonResult;
  };

  const getCardLessonResult = (
    exercise: Exercise,
    answer: ExerciseEvaluation
  ): LessonResult => {
    const e = exercise as CardExercise;
    const a = answer as CardFeedback;
    return {
      givenAnswer: a.givenAnswer,
      correctAnswer: a.correctAnswer,
      score: a.score
    };
  };

  const getClozeLessonResult = (
    exercise: Exercise,
    answer: ExerciseEvaluation
  ): LessonResult => {
    const e = exercise as CheckClozeExercise;
    const a = answer as CheckClozeFeedback;
    return {
      givenAnswer: a.value,
      correctAnswer: a.correctValue ?? '',
      score: a.score
    };
  };

  const getVerbLessonResult = (
    exercise: Exercise,
    answer: ExerciseEvaluation
  ): LessonResult => {
    const e = exercise as CheckVerbExercise;
    const a = answer as CheckVerbFeedback;
    return {
      givenAnswer: `${a.answer.value}`,
      correctAnswer: a.correctValue,
      score: a.score
    };
  };

  // Vertaal de results van de exercises naar uniforme LessonResults
  const lessonResults = exercises.flatMap((e) =>
    results
      .filter((r) => r.lessonId === e.lessonId && r.seqNumber === e.seqNumber)
      .map((r) => getExerciseResult(e, r))
  );

  // Vat de array samen per vraag met het aantal goede en foute antwoorden
  const groupedResult = Object.groupBy(lessonResults, (r) => r.correctAnswer);

  return Object.entries(groupedResult).map(([correctAnswer, answers]) => ({
    correctAnswer,
    countAnswers: answers!.length - 1,
    result: answers!.some((a) => a.score !== 'wrong') ? 'correct' : 'wrong'
  }));
}
