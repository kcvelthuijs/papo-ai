import {
  type SentenceBuildExercise as dtoSentenceBuildExercise,
  type Sentence as dtoSentence,
} from '@workspace/dtotypes';

type Sentence = dtoSentence;

export type SentenceBuildExercise = dtoSentenceBuildExercise;

export type SentenceProps = {
  exercise: SentenceBuildExercise;
  onComplete: (answer: Record<string, string>) => void;
};
