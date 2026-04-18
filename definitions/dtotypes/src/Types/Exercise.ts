import type { VerbConjugation } from './Pronouns';

export type BaseExercise = {
  id: string;
  type: string;
  title: string;
  description: string;
  isDone: boolean;
};

export type VerbLearnExercise = BaseExercise & {
  type: 'verb-learning';
  verb: VerbConjugation;
};

export type SentenceFillInExercise = BaseExercise & {
  type: 'sentence-click-test';
  sentences: Sentence[];
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
  | BaseExercise
  | VerbLearnExercise
  | SentenceClickTest
  | SentenceClickTest
  | QuizQuestion;

export type SentenceExercise = {
  id: string;
  type: 'sentence-type-test';
  sentences: Sentence[];
};

export type Gap = {
  id: string;
  correct: string;
  hint?: string;
};

export type Sentence = {
  id: string;
  textParts: string[];
  gaps: Gap[];
  translation?: string;
};
