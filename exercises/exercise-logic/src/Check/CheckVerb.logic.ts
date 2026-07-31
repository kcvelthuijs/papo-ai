import {
  type CheckVerbExercise,
  type VerbAnswer,
  type CheckVerbFeedback,
  type ExerciseAction,
} from '@workspace/dtotypes';
import { checkAnswerText } from '../Atoms/CheckAnswer';

export function checkVerb(
  exercise: CheckVerbExercise,
  question: number,
  answer: VerbAnswer,
): CheckVerbFeedback {
  const correctAnswer = exercise.forms[answer.pronounId] ?? '';
  const givenAnswer = answer.value.trim().toLowerCase();

  // zet de score
  const score = checkAnswerText(givenAnswer, correctAnswer);

  // bepaal de volgende actie
  const nextAction: ExerciseAction =
    score === 'wrong'
      ? 'retry'
      : answer.pronounId === 'p3mv'
        ? 'next exercise'
        : 'next';

  return {
    lessonId: exercise.lessonId,
    seqNumber: exercise.seqNumber,
    question,
    answer,
    correctValue: correctAnswer,
    score,
    nextAction,
  };
}
