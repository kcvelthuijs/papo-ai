import type {
  ClosedExercise,
  ExerciseEvaluation,
  OpenExercise,
  CheckVerbExercise,
  CheckGapExercise,
  SentenceBuildExercise,
  OpenExerciseFeedback,
} from '@workspace/dtotypes';

import { isOpenExercise } from '../Types/Exercise.types';
import { checkGap } from '../Check/CheckGap.logic';
import { checkVerb } from '../Check/CheckVerb.logic';
import { checkBuild } from '../Check/SentenceBuild.logic';
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
      result: {
        exerciseId: exercise.id,
        type: feedback.score > 0.7 ? 'right' : 'wrong',
        answer,
        meta: {
          feedback: feedback.feedback,
          score: feedback.score,
          suggestions: feedback.suggestions,
        },
      },

      nextAction: 'stay', // vaak LLM = stay (user iteratie)
    };
  }

  // -------------------------
  // CLOSED (deterministic)
  // -------------------------
  switch (exercise.type) {
    case 'verb-click-learn':
    case 'verb-click-test':
    case 'verb-type-test':
      return checkVerb(exercise as CheckVerbExercise, answer);

    case 'sentence-type-test':
      return checkGap(exercise as CheckGapExercise, answer);

    case 'sentence-build-test':
      return checkBuild(exercise as SentenceBuildExercise, answer);

    default:
      throw new Error(
        `Unknown exercise type: ${(exercise as ClosedExercise).type}`,
      );
  }
}
