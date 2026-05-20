import type {
  ClosedExercise,
  ExerciseEvaluation,
  OpenExercise,
  CheckVerbExercise,
  CheckGapExercise,
  FlashCardExercise,
} from '@workspace/dtotypes';

import { isOpenExercise } from '../Types/Exercise.types';

import { checkGap } from '../Check/CheckGap.logic';
import { checkVerb } from '../Check/CheckVerb.logic';
import { checkFlashCard } from '../Check/CheckFlashCard.logic';
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
          exerciseId: exercise.id,
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

      case 'gap-click-test':
      case 'gap-type-test':
        return checkGap(exercise as CheckGapExercise, answer);

      case 'flash-card':
        return checkFlashCard(exercise as FlashCardExercise, answer);

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
