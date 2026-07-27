import { type LessonSummary } from '@workspace/dtotypes';
import { LessonsRepository } from '@repositories/postgresdb';

export const lessonService = {
  async getAll(): Promise<LessonSummary[]> {
    return await LessonsRepository.getAll();
  },

  async getSummary(filename: string): Promise<LessonSummary> {
    throw new Error('not implemented');
    try {
    } catch (e) {}
  },

  async getByID(id: string): Promise<LessonSummary> {
    return await LessonsRepository.getById(Number(id));
  }
};
