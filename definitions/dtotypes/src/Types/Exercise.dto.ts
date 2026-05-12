import type { PronounId, TenseId } from '@workspace/dtotypes';

export type ExerciseState = 'prepare' | 'active' | 'completed';

export type ExerciseAction =
  | 'retry'
  | 'next'
  | 'next step'
  | 'next exercise'
  | 'restart'
  | 'quit';
export type ExerciseScore = 'right' | 'wrong' | 'partial' | undefined;

export type ExerciseExitReason = 'end' | 'quit';

export type BaseExercise = {
  id: string;
  type: string;
  title: string;
  description: string;
  state: ExerciseState;
};

// -----------------------
//  COLLECTION OF EXERCISES
// -----------------------
export type Exercise = ClosedExercise | OpenExercise;
export type ExerciseEvaluation = {
  exerciseId: string;
  score: ExerciseScore;
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
export type CheckVerbFeedback = ExerciseEvaluation & {
  answer: VerbAnswer;
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
  type: 'gap-type-test' | 'gap-click-test';
  phrases: Phrase[];
  phraseIndex: number;
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
  alt?: string[];
};
export type GapAnswer = {
  phraseIndex: number;
  gapIndex: number;
  gapId: string;
  value: string;
};
export type CheckGapFeedback = ExerciseEvaluation & {
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
  meta?: any;
};
export type OpenAnswer = {
  value: string;
};
export type OpenExerciseFeedback = {
  feedback: string;
  score: number;
  suggestions: string;
};
