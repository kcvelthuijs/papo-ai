import {
  type CheckGapExercise as dtoCheckGapExercise,
  type Phrase as dtoPhrase,
} from '@workspace/dtotypes';

type Phrase = dtoPhrase;

export type CheckGapExercise = dtoCheckGapExercise;

export type PhraseProps = {
  exercise: CheckGapExercise;
  onComplete: (answer: Record<string, string>) => void;
};
