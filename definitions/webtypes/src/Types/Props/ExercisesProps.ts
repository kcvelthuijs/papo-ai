import {
  type CheckClozeExercise as dtoCheckClozeExercise,
  type Phrase as dtoPhrase,
} from '@workspace/dtotypes';

type Phrase = dtoPhrase;

export type CheckClozeExercise = dtoCheckClozeExercise;

export type PhraseProps = {
  exercise: CheckClozeExercise;
  onComplete: (answer: Record<string, string>) => void;
};
