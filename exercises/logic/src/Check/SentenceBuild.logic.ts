import type {
  SentenceBuildExercise,
  SentenceBuildAnswer,
  SentenceBuildFeedback,
} from '@workspace/dtotypes/src/Types/Exercise.dto';

export function checkBuild(
  exercise: SentenceBuildExercise,
  answer: SentenceBuildAnswer,
): SentenceBuildFeedback {
  const correct: string[] = exercise.correctOrder;
  const current = answer.value;

  const isCorrectSoFar = current.every(
    (word: string, index: number) => word === correct[index],
  );

  const isComplete = current.length === correct.length && isCorrectSoFar;

  return {
    isCorrectSoFar,
    isComplete,
    value: current,
    correctOrder: correct,
  };
}
