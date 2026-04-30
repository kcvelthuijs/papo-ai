import {
  type PhraseBuildExercise as dtoPhraseBuildExercise,
  type Phrase as dtoPhrase
} from '@workspace/dtotypes';

type Phrase = dtoPhrase;

export type PhraseBuildExercise = dtoPhraseBuildExercise;

export type PhraseProps = {
  exercise: PhraseBuildExercise;
  onComplete: (answer: Record<string, string>) => void;
};
