import type {
  OpenExercise,
  CheckVerbExercise,
  CheckGapExercise,
  GapAnswer,
  ExerciseExitReason,
} from '@workspace/dtotypes';
import type { PropertyNameLiteral } from 'typescript';

export function isOpenExercise(ex: any): ex is OpenExercise {
  return (
    ex.type === 'open-writing' ||
    ex.type === 'open-dialog' ||
    ex.type === 'open-reflection'
  );
}

export type VerbExerciseProps = {
  exercise: CheckVerbExercise;
  onSubmit: (answer: { pronounId: string; value: string }) => Promise<any>;
  onComplete: (reason: ExerciseExitReason) => Promise<void>;
};

export type GapExerciseProps = {
  exercise: CheckGapExercise;
  onSubmit: (answer: GapAnswer) => Promise<any>;
  onComplete: (reason: ExerciseExitReason) => Promise<void>;
};

export type QuizQuestionProps = {
  className?: string;
  question: string;
  correct: string;
  options: string[];
};

export type OpenExerciseProps = {
  exercise: OpenExercise;
  onSubmit: (message: string) => Promise<any>;
  onComplete: (reason: ExerciseExitReason) => Promise<void>;
};
