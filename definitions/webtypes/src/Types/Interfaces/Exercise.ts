import type {
  VerbLearnExercise as dtoVerbLearnExercise,
  Sentence as dtoSentence,
  Gap as dtoGap
} from '@workspace/dtotypes/src/Types/Exercise';

export type VerbLearnExercise = dtoVerbLearnExercise;
export type Sentence = dtoSentence;
export type Gap = dtoGap;

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
