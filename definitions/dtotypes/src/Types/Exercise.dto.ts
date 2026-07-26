import type { AvatarConfig, PronounId, TenseId } from '@workspace/dtotypes';

export type ExerciseState =
  | 'unknown'
  | 'prepare'
  | 'ready'
  | 'active'
  | 'completed';

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
export type Exercise = ClosedExercise | ChatExercise;
export type ExerciseEvaluation = {
  lessonId: number;
  seqNumber: number;
  score: ExerciseScore;
  nextAction: ExerciseAction;
};

// -----------------------
//  CLOSEDEXERCISES
// -----------------------
export type ClosedExercise =
  | BaseExercise
  | CheckVerbExercise
  | CheckClozeExercise
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
//  CheckClozeExercise
// -----------------------
export type CheckClozeExercise = BaseExercise & {
  type: 'cloze-type-test' | 'cloze-click-test';
  phrases: Phrase[];
  phraseIndex: number;
};
export type Phrase = {
  id: string;
  textParts: string[];
  gaps: Cloze[];
  translation?: string;
};
export type Cloze = {
  id: string;
  correct: string;
  hint?: string;
  alt?: string[];
};
export type ClozeAnswer = {
  phraseIndex: number;
  clozeIndex: number;
  clozeId: string;
  value: string;
};
export type CheckClozeFeedback = ExerciseEvaluation & {
  clozeId: string;
  value: string;
  correctValue: string | null;
};

// -----------------------
//  CardExercise
// -----------------------
export type CardExercise = BaseExercise & {
  type: 'card-click-learn' | 'card-type-test';
  items: CardItem[];
  imageLocation?: string[];
};
export type CardItem = {
  id: string;
  name: string;
  tree: string[];
  question: string;
  response: string;
  hint?: string;
  image?: string;
};
export type CardAnswer = {
  id: string;
  value: string;
};
export type CardFeedback = ExerciseEvaluation & {
  givenAnswer: string;
  correctAnswer: string;
};

// -----------------------
//  OPENEXERCISES
// -----------------------
export type ChatExercise = BaseExercise & {
  id: string;
  type: 'open-writing' | 'open-dialog' | 'open-reflection';
  description: string;
  prompt: string;
  avatar: AvatarConfig;
  voice: any;
  scenes: ChatScene[];
};
export type ChatScene = {
  sequenceNumber: number;
  title: string;
  words: string[];
  prompt: string;
  completionRules: CompletionRule[];
};
export interface CompletionRule {
  key: string;
  description: string;
  alternatives: string[];
}
export type ChatResponse = {
  responseId: string;
  value: string;
};
export type ChatExerciseFeedback = {
  feedback: string;
  score: number;
  suggestions: string;
};
