import type {
  ClosedExercise,
  ExerciseEvaluation,
  OpenExercise,
  CheckVerbExercise,
  CheckClozeExercise,
  CardExercise,
} from '@workspace/dtotypes';

import { isOpenExercise } from '../Types/Exercise.types';

import { checkCloze } from '../Check/CheckCloze.logic';
import { checkVerb } from '../Check/CheckVerb.logic';
import { checkCard } from '../Check/CheckCard.logic';
import { evaluateOpenDialog } from '../Check/OpenDialog.logic';

export async function executeExercise(
  exercise: ClosedExercise | OpenExercise,
  answer: any,
): Promise<ExerciseEvaluation> {
  // -------------------------
  // OPEN (LLM)
  // -------------------------
  if (isOpenExercise(exercise)) {
    switch (exercise.type.toLowerCase()) {
      case 'open-dialog':
        const feedback = await evaluateOpenDialog(exercise, answer);
        return {
          lessonId: exercise.lessonId,
          seqNumber: exercise.seqNumber,
          score: feedback.score > 0.7 ? 'right' : 'wrong',
          nextAction: 'next',
        };
      default:
        throw new Error(
          `Unknown open exercise type: ${(exercise as ClosedExercise).type}`,
        );
    }
  } else {
    // -------------------------
    // CLOSED (deterministic)
    // -------------------------
    switch (exercise.type.toLowerCase()) {
      case 'verb-click-learn':
      case 'verb-click-test':
      case 'verb-type-test':
        return checkVerb(exercise as CheckVerbExercise, answer);

      case 'cloze-click-test':
      case 'cloze-type-test':
        return checkCloze(exercise as CheckClozeExercise, answer);

      case 'card-type-test':
      case 'card-click-learn':
        return checkCard(exercise as CardExercise, answer);

      /*
      case 'Phrase-build-test':
        return checkBuild(exercise as PhraseBuildExercise, answer);
*/
      default:
        throw new Error(
          `Unknown closed exercise type: ${(exercise as ClosedExercise).type}`,
        );
    }
  }
}
