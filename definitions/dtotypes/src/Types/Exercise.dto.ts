import type { PronounId, TenseId } from '@workspace/dtotypes';

export type ExerciseState = 'prepare' | 'active' | 'completed';
export type ExerciseAction = 'stay' | 'retry' | 'next';
export type ExerciseResult = 'right' | 'wrong' | 'partial';

export type BaseExercise = {
  id: string;
  type: string;
  title: string;
  description: string;
};

export type ExecuteContext = {
  isCompleted?: boolean;
};

// -----------------------
//  COLLECTION OF EXERCISES
// -----------------------
export type Exercise = ClosedExercise | OpenExercise;
export type ExerciseEvaluation = {
  exerciseId: string;
  score: ExerciseResult;
  answer: any;
  meta?: any;
  nextAction: ExerciseAction;
};

// -----------------------
//  CLOSEDEXERCISES
// -----------------------
export type ClosedExercise =
  | BaseExercise
  | CheckVerbExercise
  | CheckGapExercise;

// -----------------------
//  CheckVerbExercise
// -----------------------
export type CheckVerbExercise = BaseExercise & {
  type: 'verb-click-learn' | 'verb-click-test' | 'verb-type-test';
  infinitive: string;
  tense: TenseId;
  forms: Record<string, string>;
};
export type VerbAnswer = {
  pronounId: string;
  value: string;
};
export type CheckVerbFeedback = {
  isCorrect: boolean;
  id: string;
  value: string;
  correctValue: string;
};

// -----------------------
//  BuildPhraseExercise
// -----------------------
export type BuildPhraseExercise = BaseExercise & {
  type: 'phrase-build-test';
  correctOrder: string[];
  translation: string;
  image: string;
};
export type PhraseBuildAnswer = {
  value: string[];
};
export type PhraseBuildFeedback = {
  isCorrectSoFar: boolean;
  isComplete: boolean;
  value: string;
  correctOrder: string[];
};

// -----------------------
//  CheckGapExercise
// -----------------------
export type CheckGapExercise = BaseExercise & {
  type: 'phrase-type-test';
  phrases: Phrase[];
};
export type Phrase = {
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
  correctValue: string | null;
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
