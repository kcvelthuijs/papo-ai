import type {
  ExerciseAction,
  CardAnswer,
  CardExercise,
  CardFeedback
} from '@workspace/dtotypes';

import { checkAnswerText } from '../Atoms/CheckAnswer';

export function checkCard(
  exercise: CardExercise,
  question: number,
  answer: CardAnswer
): CardFeedback {
  // vind het item
  const flashCardItem = exercise.items.find((a) => a.id === answer.id);

  if (!flashCardItem) throw new Error(`Card item not found: ${answer.id}`);

  // bepaal de uitslag
  const givenAnswer = answer.value;
  const correctAnswer = flashCardItem.response;
  const score = checkAnswerText(givenAnswer, correctAnswer);

  // bepaal de volgende actie
  const nextAction: ExerciseAction =
    score === 'wrong'
      ? 'retry'
      : exercise.seqNumber < exercise.items.length - 1
        ? 'next step'
        : 'next exercise';

  return {
    lessonId: exercise.lessonId,
    seqNumber: exercise.seqNumber,
    question,
    score,
    nextAction,
    givenAnswer,
    correctAnswer
  };
}
