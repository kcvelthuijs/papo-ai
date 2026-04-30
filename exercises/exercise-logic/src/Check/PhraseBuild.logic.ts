import type {
  PhraseBuildExercise,
  PhraseBuildAnswer,
  PhraseBuildFeedback
} from '@workspace/dtotypes';

export function checkBuild(
  exercise: PhraseBuildExercise,
  answer: PhraseBuildAnswer
): PhraseBuildFeedback {
  const correct: string[] = exercise.correctOrder;
  const current = answer.value;

  const isCorrectSoFar = current.every(
    (word: string, index: number) => word === correct[index]
  );

  const isComplete = current.length === correct.length && isCorrectSoFar;

  return {
    isCorrectSoFar,
    isComplete,
    value: current,
    correctOrder: correct
  };
}
