import type { PronounId, VerbConjugation } from '@workspace/dtotypes/src/Types/Pronouns.dto';

export type BaseExercise = {
  id: string;
  type: string;
  title: string;
  description: string;
};

// -----------------------
//  COLLECTION OF EXERCISES
// -----------------------
export type Exercise = ClosedExercise | OpenExercise;
export type ExerciseEvaluation = {
  result: {
    exerciseId: string;
    type: 'right' | 'wrong' | 'partial';
    answer: any;
    meta?: any;
  };
  nextAction: 'next-exercise' | 'retry' | 'stay';
};

// -----------------------
//  CLOSEDEXERCISES
// -----------------------
export type ClosedExercise =
  | BaseExercise
  | CheckVerbExercise
  | SentenceBuildExercise;

// -----------------------
//  CheckVerbExercise
// -----------------------
export type CheckVerbExercise = BaseExercise & {
  pronounId: string;
  type: 'verb-click-learn' | 'verb-click-test' | 'verb-type-test';
  verb: VerbConjugation;
};
export type VerbAnswer = {
  pronounId: string;
  value: string;
};
export type CheckVerbFeedback = {
  isCorrect: boolean;
  id: string;
  value: PronounId;
  correctValue: string;
};

// -----------------------
//  SentenceBuildExercise
// -----------------------
export type SentenceBuildExercise = {
  type: 'sentence-build-test';
  correctOrder: string[];
};
export type SentenceBuildAnswer = {
  value: string[];
};
export type SentenceBuildFeedback = {
  isCorrectSoFar: boolean;
  isComplete: boolean;
  value: string;
  correctOrder: string[];
};

// -----------------------
//  CheckGapExercise
// -----------------------
export type CheckGapExercise = {
  type: 'sentence-type-test';
  sentences: Sentence[];
};
export type Sentence = {
  id: string;
  textParts: string[];
  gaps: Gap[];
  translation?: string;
};
export type Gap = {
  id: string;
  correct: string;
  hint?: string;
};
export type GapAnswer = {
  gapId: string;
  value: string;
};
export type CheckGapFeedback = {
  isCorrect: boolean;
  gapId: string;
  value: string;
  correctValue: string;
};

// -----------------------
//  OPENEXERCISES
// -----------------------
export type OpenExercise = BaseExercise & {
  id: string;
  type: 'open-writing' | 'open-dialogue' | 'open-reflection';
  prompt: string;
  feedback?: string;
  rubric?: string;
};
export type OpenAnswer = {
  value: string;
};
export type OpenExerciseFeedback = {
  feedback: string;
  score: number;
  suggestions: string;
};
