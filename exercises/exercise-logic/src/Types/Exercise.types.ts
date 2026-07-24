import type {
  ChatExercise,
  CheckVerbExercise,
  CheckClozeExercise,
  ClozeAnswer,
  ExerciseExitReason,
  CardExercise,
  CardFeedback,
  CheckClozeFeedback,
  CheckVerbFeedback,
  CardAnswer,
} from '@workspace/dtotypes';

import type { SpeechOptions } from '@workspace/dtotypes';

export function isOpenExercise(ex: any): ex is ChatExercise {
  return (
    ex.type === 'open-writing' ||
    ex.type === 'open-dialog' ||
    ex.type === 'open-reflection'
  );
}

export type VerbExerciseProps = {
  exercise: CheckVerbExercise;
  onSubmit: (answer: {
    pronounId: string;
    value: string;
  }) => Promise<CheckVerbFeedback>;
  onComplete: (reason: ExerciseExitReason) => Promise<void>;
  handleAudio: (
    text: string,
    options?: SpeechOptions,
    callBack?: () => void,
  ) => Promise<void>;
};

export type ClozeExerciseProps = {
  exercise: CheckClozeExercise;
  onSubmit: (answer: ClozeAnswer) => Promise<CheckClozeFeedback>;
  onComplete: (reason: ExerciseExitReason) => Promise<void>;
  handleAudio: (
    text: string,
    options?: SpeechOptions,
    callBack?: () => void,
  ) => Promise<void>;
};

export type CardExerciseProps = {
  exercise: CardExercise;
  onSubmit: (answer: CardAnswer) => Promise<CardFeedback>;
  onComplete: (reason: ExerciseExitReason) => Promise<void>;
  handleAudio: (
    text: string,
    options?: SpeechOptions,
    callBack?: () => void,
  ) => Promise<void>;
};

export type QuizQuestionProps = {
  className?: string;
  question: string;
  correct: string;
  options: string[];
};

export type ChatExerciseProps = {
  exercise: ChatExercise;
  onSubmit: (message: string) => Promise<any>;
  onComplete: (reason: ExerciseExitReason) => Promise<void>;
  handleAudio: (
    text: string,
    options?: SpeechOptions,
    callBack?: () => void,
  ) => Promise<void>;
};
