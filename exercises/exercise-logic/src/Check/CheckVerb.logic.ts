import type {
  CheckVerbExercise,
  VerbAnswer,
  CheckVerbFeedback
} from '@workspace/dtotypes';

export function checkVerb(
  exercise: CheckVerbExercise,
  answer: VerbAnswer
): CheckVerbFeedback {
  const correctValue = exercise.verb.forms[answer.pronounId];
  const normalizedUser = answer.value.trim().toLowerCase();
  const normalizedCorrect = correctValue?.trim().toLowerCase();
  const isCorrect = normalizedUser === normalizedCorrect;

  return {
    isCorrect,
    id: answer.pronounId,
    value: answer.value,
    correctValue
  };
}
