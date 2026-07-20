import type {
  ExerciseAction,
  CardAnswer,
  CardExercise,
  CardFeedback,
} from '@workspace/dtotypes';
import { checkAnswerText } from '../Atoms/CheckAnswer';

export function checkCard(
  exercise: CardExercise,
  answer: CardAnswer,
): CardFeedback {
  // vind het item
  const flashCardItem = exercise.items.find((a) => a.id === answer.id);

  if (!flashCardItem) throw new Error(`Card item not found: ${answer.id}`);

  // bepaal de uitslag
  const givenAnswer = answer.value;
  const correctAnswer = flashCardItem.response;
  const score = checkAnswerText(givenAnswer, correctAnswer);

  // bepaal de volgende actie
  const nextAction: ExerciseAction = score === 'wrong' ? 'retry' : 'next step';

  return {
    lessonId: exercise.lessonId,
    seqNumber: exercise.seqNumber,
    score,
    nextAction,
    givenAnswer,
    correctAnswer,
  };
}
