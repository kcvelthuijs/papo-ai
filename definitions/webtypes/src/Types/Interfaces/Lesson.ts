import type { LessonSummary as LessonSummaryDto } from '@workspace/dtotypes';
import type { ExerciseResult } from './Exercise';
export type LessonSummary = LessonSummaryDto;

export type LessonEngineEvaluation = {
  result: ExerciseResult;
  nextAction: 'next-exercise' | 'retry' | 'stay';
};
