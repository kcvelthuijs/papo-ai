import type {
  CheckVerbExercise as dtoCheckVerbExercise,
  Phrase as dtoPhrase,
  Cloze as dtoCloze,
  ExerciseEvaluation as dtoExerciseEvaluation,
} from '@workspace/dtotypes';

export type CheckVerbExercise = dtoCheckVerbExercise;
export type Phrase = dtoPhrase;
export type Cloze = dtoCloze;
export type ExerciseEvaluation = dtoExerciseEvaluation;

export type ExerciseInputState = 'idle' | 'input' | 'ready' | 'wrong' | 'temp';

export const EXERCISE_FEEDBACK_TIME = 800;
