import { VerbClickLearn } from '@workspace/ui/components/Exercises/VerbClickLearn';
import { VerbClickTest } from '@workspace/ui/components/Exercises/VerbClickTest';
import { VerbTypeTest } from '@workspace/ui/components/Exercises/VerbTypeTest';
import { SentenceClickTest } from '@workspace/ui/components/Exercises/SentenceClickTest';
import { SentenceTypeTest } from '@workspace/ui/components/Exercises/SentenceTypeTest';

import type {
  Gap,
  Sentence
} from '@workspace/webtypes/src/Types/Interfaces/Exercise';
import type { Exercise } from '@workspace/dtotypes/src/Types/Exercise';

// -------------------------
// GENERIEK TYPE
// -------------------------

type ExerciseHandler = {
  start?: (exercise: Exercise) => void;
  validate: (exercise: Exercise, answer: any) => boolean;
  getCorrectAnswer?: (exercise: Exercise) => any;
};

// -------------------------
// REGISTRY
// -------------------------

export const exerciseRegistry: Record<string, ExerciseHandler> = {
  // -------------------------
  // VERB CLICK LEARN
  // -------------------------
  'verb-click-learn': {
    start: (ex: Exercise) => {
      // meestal niets nodig
    },

    validate: (ex: Exercise, answer: string) => {
      return ex.isDone;
    },

    getCorrectAnswer: (ex: Exercise) => ex.isDone
  },

  // -------------------------
  // VERB TYPE TEST
  // -------------------------
  'verb-type-test': {
    validate: (ex: Exercise, answer: { id: string; value: string }) => {
      const correct = (ex as VerbTypeTest).forms[answer.id];
      return correct === answer.value;
    },

    getCorrectAnswer: (ex: Exercise) => (ex as VerbTypeTest).forms
  },

  // -------------------------
  // SENTENCE TYPE TEST
  // -------------------------
  'sentence-type-test': {
    validate: (ex: Exercise, answer: { gapId: string; value: string }) => {
      const gap = (ex as SentenceTypeText).sentences
        .flatMap((s: Sentence) => s.gaps)
        .find((g: Gap) => g.id === answer.gapId);

      if (!gap) return false;

      return gap.correct.toLowerCase() === answer.value.toLowerCase();
    },

    getCorrectAnswer: (ex: SentenceTypeTest) => {
      return ex.sentences.flatMap((s: Sentence) => s.gaps);
    }
  }
};
