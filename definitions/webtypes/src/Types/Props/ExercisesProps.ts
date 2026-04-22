import {
  type SentenceExercise as dtoSentenceExercise,
  type Sentence as dtoSentence,
} from '@workspace/dtotypes/src/Types/Exercise.dto';

export type Sentence = dtoSentence;

export type SentenceExercise = dtoSentenceExercise;

export type SentenceProps = {
  exercise: SentenceExercise;
  onComplete: (answer: Record<string, string>) => void;
};
