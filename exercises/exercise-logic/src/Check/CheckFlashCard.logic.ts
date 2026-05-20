import type {
  ExerciseAction,
  FlashCardAnswer,
  FlashCardExercise,
  FlashCardFeedback,
} from '@workspace/dtotypes';
import { checkAnswerText } from '../Atoms/CheckAnswer';

export function checkFlashCard(
  exercise: FlashCardExercise,
  answer: FlashCardAnswer,
): FlashCardFeedback {
  // vind het item
  const flashCardItem = exercise.items.find((a) => a.id === answer.id);

  if (!flashCardItem) throw new Error(`FlashCard item not found: ${answer.id}`);

  // bepaal de uitslag
  const givenAnswer = answer.value;
  const correctAnswer = flashCardItem.translation;
  const score = checkAnswerText(givenAnswer, correctAnswer);

  // bepaal de volgende actie
  const nextAction: ExerciseAction = score === 'wrong' ? 'retry' : 'next step';

  return {
    exerciseId: exercise.id,
    score,
    nextAction,
    givenAnswer,
    correctAnswer,
  };
}
