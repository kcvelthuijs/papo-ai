import type {
  ClosedExercise,
  ExerciseState,
  ChatExercise,
  Exercise,
} from '@workspace/dtotypes';

import { isOpenExercise } from '../Types/Exercise.types';
import { useDialogStore } from '../Stores/DialogStore';
import { useAvatarStore, useLessonStore } from '@workspace/controllers';

export async function prepareExercise(
  exercise: Exercise,
): Promise<ExerciseState> {
  if (exercise) {
    // -------------------------
    // OPEN (LLM)
    // -------------------------
    if (isOpenExercise(exercise)) {
      switch (exercise.type.toLowerCase()) {
        case 'open-dialog':
          const dialogExercise = useLessonStore.getState()
            .currentExercise as ChatExercise;
          // Stel de avatar in
          useAvatarStore.getState().setAvatar('bot', dialogExercise.avatar);

          if (!dialogExercise.scenes || dialogExercise.scenes.length < 1) {
            useLessonStore.setState((state) => ({
              ...state,
              error: `Lesson has no scenes`,
            }));
            exercise.state = 'active';
          } else {
            // Initialiseer de dialoog
            useDialogStore.getState().initialize({
              title: dialogExercise.title,
              identity: dialogExercise.prompt,
              assignment: dialogExercise.scenes[0]?.prompt ?? '',
            });
            await useDialogStore.getState().startDialog();
            exercise.state = 'active';
          }
          break;

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
  }
  return exercise?.state ?? 'unknown';
}
