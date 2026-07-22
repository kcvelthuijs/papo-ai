import type {
  ClosedExercise,
  ExerciseState,
  ChatExercise,
} from '@workspace/dtotypes';
import { sleep } from '@workspace/ui';

import { isOpenExercise } from '../Types/Exercise.types';

export async function prepareExercise(
  exercise: ClosedExercise | ChatExercise,
): Promise<ExerciseState> {
  // -------------------------
  // OPEN (LLM)
  // -------------------------
  if (isOpenExercise(exercise)) {
    switch (exercise.type.toLowerCase()) {
      case 'open-dialog':
        exercise.state = 'ready';
        break;

      default:
        throw new Error(
          `Unknown open exercise type: ${(exercise as ClosedExercise).type}`,
        );
    }
    await sleep(1000);
  } else {
    // -------------------------
    // CLOSED (deterministic)
    // -------------------------
    // no preparation needed
    exercise.state = 'ready';
  }
  return exercise.state ?? 'unknown';
}
