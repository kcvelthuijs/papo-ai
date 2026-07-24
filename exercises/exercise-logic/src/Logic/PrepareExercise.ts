import type {
  ClosedExercise,
  ExerciseState,
  ChatExercise,
} from '@workspace/dtotypes';

import { isOpenExercise } from '../Types/Exercise.types';
import { useDialogStore } from '../Stores/DialogStore';
import { useAvatarStore } from '@workspace/controllers';

export async function prepareExercise(
  exercise: ClosedExercise | ChatExercise,
): Promise<ExerciseState> {
  // -------------------------
  // OPEN (LLM)
  // -------------------------
  if (isOpenExercise(exercise)) {
    switch (exercise.type.toLowerCase()) {
      case 'open-dialog':
        // Stel de avatar in
        useAvatarStore.getState().setAvatar('bot', exercise.avatar);

        // Initialiseer de dialoog
        useDialogStore.getState().initialize({
          title: exercise.title,
          identity: exercise.prompt,
          assignment: exercise.scenes[0]?.prompt ?? '',
        });
        await useDialogStore.getState().startDialog();
        exercise.state = 'active';
        return 'active';

      default:
        throw new Error(
          `Unknown open exercise type: ${(exercise as ClosedExercise).type}`,
        );
    }
  } else {
    // -------------------------
    // CLOSED (deterministic)
    // -------------------------
    // no preparation needed
    exercise.state = 'ready';
  }
  return exercise.state ?? 'unknown';
}
