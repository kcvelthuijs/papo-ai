import type {
  CheckVerbExercise as dtoCheckVerbExercise,
  Phrase as dtoPhrase,
  Gap as dtoGap,
} from '@workspace/dtotypes';

export type CheckVerbExercise = dtoCheckVerbExercise;
export type Phrase = dtoPhrase;
export type Gap = dtoGap;

export type ExerciseInputState = 'idle' | 'input' | 'ready';

export const EXERCISE_FEEDBACK_TIME = 800;
