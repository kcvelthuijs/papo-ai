import {
  type LessonSummary,
  type LessonDetails
} from '../Interfaces/lesson.dto';



abstract class ILessonRepository {
  constructor() { };

  abstract getAll(): LessonSummary[];

  abstract getById(id: number): LessonDetails;
}
