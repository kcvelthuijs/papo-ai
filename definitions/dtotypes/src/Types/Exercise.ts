export type Exercise = {
  id: string;
  type: string;
};

type ExerciseStrategy = {
  generate?: (exercise: any) => Promise<any>;
  start?: (exercise: any) => void;
  interact?: (exercise: any, input: any) => Promise<any>;
  evaluate?: (exercise: any, answer: any) => Promise<ExerciseResult>;
  summarize?: (exercise: any, history: any[]) => Promise<any>;
  getCorrectAnswer?: (exercise: any) => Promise<any>;
  validate: (exercise: any, answer: any) => boolean;
};

export const exerciseStrategies: Record<string, ExerciseStrategy> = {
  'verb-click-learn': {
    validate: (ex, answer) => ex.correct === answer,
    getCorrectAnswer: (ex) => ex.correct
  },

  'quiz-question': {
    validate: (ex, answer) => ex.correctIndex === answer,
    getCorrectAnswer: (ex) => ex.answers[ex.correctIndex]
  }
};

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
