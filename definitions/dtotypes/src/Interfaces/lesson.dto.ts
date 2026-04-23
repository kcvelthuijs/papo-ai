import type { Exercise } from '@workspace/dtotypes';

export type LessonSummary = {
  id: string;
  type: string;
  title: string;
  level: string;
  image: string;
  description: string;
};

export type LessonDetails = {
  id: string;
  type: string;
  title: string;
  level: string;
  image: string;
  description: string;
  exercises: Exercise[];
};
