export type BaseExercise = {
  id: string;
  type: string;
};

export type VerbClickLearn = BaseExercise & {
  type: 'verb-click-learn';
  prompt: string;
  options: string[];
  correct: string;
};

export type VerbTypeLearn = BaseExercise & {
  type: 'verb-type-learn';
  verb: string;
  answer: string;
};

export type SentenceClickTest = BaseExercise & {
  type: 'sentence-click-test';
  sentence: string;
  options: string[];
  correctIndex: number;
};

export type QuizQuestion = BaseExercise & {
  type: 'quiz-question';
  question: string;
  answers: string[];
  correctIndex: number;
};

export type Exercise =
  | VerbClickLearn
  | VerbTypeLearn
  | SentenceClickTest
  | QuizQuestion;

