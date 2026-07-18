import pool from '../Connections/connect.pool';
import { type ExerciseData } from '@workspace/dtotypes';

class classExercisesRepository {
  sqlCommand = `SELECT "lessonId"
        ,"seqNumber"
        , CASE 
            WHEN "exerciseType" = 'verb' 
                THEN "Lesson"."GetVerbExercise"(ex."exerciseId")
            WHEN "exerciseType" = 'card' 
                THEN "Lesson"."GetCardExercise"(ex."exerciseId")
            WHEN "exerciseType" = 'cloze' 
                THEN "Lesson"."GetClozeExercise"(ex."exerciseId")
            WHEN "exerciseType" = 'chat'
                THEN "Lesson"."GetChatExercise"(ex."exerciseId")
            END "exercise"
        FROM "Lesson"."Exercises" ex`;

  constructor() {}

  async getAll(): Promise<ExerciseData[]> {
    const query = this.sqlCommand;
    try {
      const exercises = await pool.query(query);
      return exercises.rows.map((l) => this.toExerciseData(l));
    } catch (error) {
      console.error('Error executing query:', error);
      throw error;
    }
  }

  async getByLessonId(LessonId: number): Promise<ExerciseData[]> {
    const query =
      this.sqlCommand +
      ` WHERE "lessonId" = $1
        ORDER BY "seqNumber"`;
    const values = [LessonId];
    try {
      const exercises = await pool.query(query, values);
      return exercises.rows.map((e) => this.toExerciseData(e));
    } catch (error) {
      console.error('Error executing query:', error);
      throw error;
    }
  }

  async getById(lessonId: number, seqNumber: number): Promise<ExerciseData> {
    const query =
      this.sqlCommand +
      ` WHERE "lessonId" = $1
          AND "seqNumber" = $2
        LIMIT 1`;
    const values = [lessonId, seqNumber];
    try {
      const result = await pool.query(query, values);
      return this.toExerciseData(result.rows[0]);
    } catch (error) {
      console.error('Error executing query:', error);
      throw error;
    }
  }

  toExerciseData(data: any): ExerciseData {
    const { type, title, description, ...payload } = data.exercise;
    return {
      lessonId: data.lessonId,
      seqNumber: data.seqNumber,
      type: type,
      title: title,
      description: description,
      data: payload,
    };
  }
}

export const ExercisesRepository = new classExercisesRepository();
