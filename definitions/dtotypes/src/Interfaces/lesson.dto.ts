import type { Exercise } from '../Types/Exercise.dto';

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
