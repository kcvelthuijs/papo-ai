import type {
  ClosedExercise,
  ExerciseEvaluation,
  ChatExercise,
  CheckVerbExercise,
  CheckClozeExercise,
  CardExercise,
} from '@workspace/dtotypes';

import { isOpenExercise } from '../Types/Exercise.types';

import { checkCloze } from '../Check/CheckCloze.logic';
import { checkVerb } from '../Check/CheckVerb.logic';
import { checkCard } from '../Check/CheckCard.logic';
import { checkDialog } from '../Check/CheckChat.logic';

export async function executeExercise(
  exercise: ClosedExercise | ChatExercise,
  question: number,
  answer: any,
  state?: any,
): Promise<ExerciseEvaluation> {
  // -------------------------
  // OPEN (LLM)
  // -------------------------
  if (isOpenExercise(exercise)) {
    switch (exercise.type.toLowerCase()) {
      case 'open-dialog':
        return checkDialog(exercise as ChatExercise, question, answer);

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
        return checkVerb(exercise as CheckVerbExercise, question, answer);

      case 'cloze-click-test':
      case 'cloze-type-test':
        return checkCloze(exercise as CheckClozeExercise, question, answer);

      case 'card-type-test':
      case 'card-click-learn':
        return checkCard(exercise as CardExercise, question, answer);

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
