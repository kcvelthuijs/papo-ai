import pool from '../Connections/connect.pool';
import { type LessonSummary } from '@workspace/dtotypes';

class classLessonsRepository {
  constructor() {}

  async getAll(): Promise<LessonSummary[]> {
    const query = `
      SELECT id, type, title, level, image, description
      FROM "Lesson"."Lessons"`;
    try {
      const lessons = await pool.query(query);
      return lessons.rows.map((l) => this.toLessonSummary(l));
    } catch (error) {
      console.error('Error executing query:', error);
      throw error;
    }
  }

  async getById(lessonId: number): Promise<LessonSummary> {
    const query = `
      SELECT id, type, title, level, image, description
      FROM "Lesson"."Lessons"
      WHERE id = $1
      LIMIT 1`;
    const values = [lessonId];
    try {
      const result = await pool.query(query, values);
      return this.toLessonSummary(result.rows[0]);
    } catch (error) {
      console.error('Error executing query:', error);
      throw error;
    }
  }

  toLessonSummary(data: any): LessonSummary {
    return {
      id: data.id.toString(),
      type: data.type,
      title: data.title,
      level: data.level,
      image: data.image?.[0] ?? '',
      description: data.description ?? ''
    };
  }
}

export const LessonsRepository = new classLessonsRepository();
