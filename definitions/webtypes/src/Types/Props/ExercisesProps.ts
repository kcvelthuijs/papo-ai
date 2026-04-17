export type SentenceModel = {
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

export type SentenceProps = {
  exercise: SentenceModel;
  onComplete: (answer: Record<string, string>) => void;
};
