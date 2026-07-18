import { type ExerciseData } from '@workspace/dtotypes';
import { ExercisesRepository } from '@repositories/postgresdb';

export const exerciseService = {
  async getAll(): Promise<ExerciseData[]> {
    return await ExercisesRepository.getAll();
  },

  async getByLessonId(id: string): Promise<ExerciseData> {
    return await ExercisesRepository.getByLessonId(Number(id));
  },

  async getByID(lessonId: number, seqNumber: number): Promise<ExerciseData> {
    return await ExercisesRepository.getById(lessonId, seqNumber);
  },
};
