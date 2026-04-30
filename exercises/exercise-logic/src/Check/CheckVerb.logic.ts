import {
  type CheckVerbExercise,
  type VerbAnswer,
  type CheckVerbFeedback,
  type ExerciseScore,
  type ExerciseAction,
} from '@workspace/dtotypes';

export function checkVerb(
  exercise: CheckVerbExercise,
  answer: VerbAnswer,
): CheckVerbFeedback {
  const correctValue = exercise.forms[answer.pronounId] ?? '';
  const normalizedUser = answer.value.trim().toLowerCase();
  const normalizedCorrect = correctValue?.trim().toLowerCase();

  // zet de score
  const score: ExerciseScore =
    normalizedUser === normalizedCorrect ? 'right' : 'wrong';

  // bepaal de volgende actie
  const nextAction: ExerciseAction =
    score !== 'right'
      ? 'retry'
      : answer.pronounId === 'p3mv'
        ? 'next exercise'
        : 'next';

  return {
    exerciseId: exercise.id,
    answer,
    correctValue,
    score,
    nextAction,
  };
}
