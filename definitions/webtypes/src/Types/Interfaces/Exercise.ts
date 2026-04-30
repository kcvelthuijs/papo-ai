import type {
  CheckVerbExercise as dtoCheckVerbExercise,
  Phrase as dtoPhrase,
  Gap as dtoGap
} from '@workspace/dtotypes';

export type CheckVerbExercise = dtoCheckVerbExercise;
export type Phrase = dtoPhrase;
export type Gap = dtoGap;

export type ExerciseInputState = 'idle' | 'input' | 'correct' | 'wrong';

export type ExerciseResult =
  | ExerciseRightResult
  | ExerciseWrongResult
  | ExerciseRemark;

export type ExerciseRightResult = {
  type: 'right';
  exerciseId: string;
  answer: any;
};

export type ExerciseWrongResult = {
  type: 'wrong';
  exerciseId: string;
  answer: any;
  correctAnswer?: any;
};

export type ExerciseRemark = {
  type: 'remark';
  exerciseId: string;
  answer: any;
  remark: string;
};
