import type {
  OpenExercise,
  CheckVerbExercise,
  CheckGapExercise,
  GapAnswer
} from '@workspace/dtotypes';

export function isOpenExercise(ex: any): ex is OpenExercise {
  return (
    ex.type === 'open-writing' ||
    ex.type === 'open-dialogue' ||
    ex.type === 'open-reflection'
  );
}

export type VerbExerciseProps = {
  exercise: CheckVerbExercise;
  onSubmit: (answer: { pronounId: string; value: string }) => Promise<any>;
};

export type GapExerciseProps = {
  exercise: CheckGapExercise;
  phraseIndex?: number;
  onSubmit: (answer: GapAnswer) => Promise<any>;
};

export type QuizQuestionProps = {
  className?: string;
  question: string;
  correct: string;
  options: string[];
};
