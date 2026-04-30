import type {
  ClosedExercise,
  ExerciseEvaluation,
  OpenExercise,
  CheckVerbExercise,
  CheckGapExercise,
  PhraseBuildExercise,
  ExerciseAction,
  ExerciseResult,
} from '@workspace/dtotypes';

import { isOpenExercise } from '../Types/Exercise.types';
import { checkGap } from '../Check/CheckGap.logic';
import { checkVerb } from '../Check/CheckVerb.logic';
import { checkBuild } from '../Check/PhraseBuild.logic';
import { evaluateOpenExercise } from '../Check/OpenExercise.logic';

export async function executeExercise(
  exercise: ClosedExercise | OpenExercise,
  answer: any,
): Promise<ExerciseEvaluation> {
  // -------------------------
  // OPEN (LLM)
  // -------------------------
  if (isOpenExercise(exercise)) {
    const feedback = await evaluateOpenExercise(exercise, answer);
    return {
      exerciseId: exercise.id,
      score: feedback.score > 0.7 ? 'right' : 'wrong',
      meta: {
        feedback: feedback.feedback,
        score: feedback.score,
        suggestions: feedback.suggestions,
      },
      nextAction: 'next',
    };
  } else {
    // -------------------------
    // CLOSED (deterministic)
    // -------------------------
    switch (exercise.type) {
      case 'verb-click-learn':
      case 'verb-click-test':
      case 'verb-type-test':
        const verbFeedback = checkVerb(exercise as CheckVerbExercise, answer);
        const isComplete =
          answer.pronounId == 'p3mv' && verbFeedback.score == 'right';
        return verbFeedback;

      /* case 'Phrase-type-test':
        return checkGap(exercise as CheckGapExercise, answer);

      case 'Phrase-build-test':
        return checkBuild(exercise as PhraseBuildExercise, answer);
*/
      default:
        throw new Error(
          `Unknown exercise type: ${(exercise as ClosedExercise).type}`,
        );
    }
  }
}
