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

export type ExerciseData = {
  lessonId: number;
  seqNumber: number;
  type: string;
  title: string;
  description: string;
  data: any;
};

export type BaseExercise = {
  lessonId: number;
  seqNumber: number;
  type: string;
  title: string;
  description: string;
  state?: ExerciseState;
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
  | CheckGapExercise
  | BuildPhraseExercise;

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
//  FlashCardExercise
// -----------------------
export type FlashCardExercise = BaseExercise & {
  type: 'flashcard-learn' | 'flashcard-test';
  items: FlashCardItem[];
  imageLocation?: string[];
};
export type FlashCardItem = {
  id: string;
  name: string;
  tree: string[];
  question: string;
  response: string;
  hint?: string;
  image?: string;
};
export type FlashCardAnswer = {
  id: string;
  value: string;
};
export type FlashCardFeedback = ExerciseEvaluation & {
  givenAnswer: string;
  correctAnswer: string;
};

// -----------------------
//  OPENEXERCISES
// -----------------------
export type OpenExercise = BaseExercise & {
  id: string;
  type: 'open-writing' | 'open-dialog' | 'open-reflection';
  description: string;
  introduction: string;
  words: string[];
  prompt: string;
  feedback?: string;
  rubric?: string;
  meta?: any;
};
export type OpenAnswer = {
  responseId: string;
  value: string;
};
export type OpenExerciseFeedback = {
  feedback: string;
  score: number;
  suggestions: string;
};
