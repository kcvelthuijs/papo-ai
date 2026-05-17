import type {
  CheckVerbExercise as dtoCheckVerbExercise,
  Phrase as dtoPhrase,
  Gap as dtoGap,
  ExerciseEvaluation as dtoExerciseEvaluation,
} from '@workspace/dtotypes';

export type CheckVerbExercise = dtoCheckVerbExercise;
export type Phrase = dtoPhrase;
export type Gap = dtoGap;
export type ExerciseEvaluation = dtoExerciseEvaluation;

export type ExerciseInputState = 'idle' | 'input' | 'ready' | 'temp';

export const EXERCISE_FEEDBACK_TIME = 800;
