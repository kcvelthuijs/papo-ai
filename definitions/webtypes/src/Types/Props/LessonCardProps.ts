import { type LessonSummary } from "../Interfaces/Lesson";

export type LessonCardProps = {
  key: string;
  lesson: LessonSummary;
  onSelectLesson: (id: string) => void;
};
