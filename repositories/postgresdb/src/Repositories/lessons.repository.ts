import sql from '../Connections/sql';
import { type LessonSummary } from '@workspace/dtotypes';

export class LessonsRepository {
  constructor() {
    console.log(`{connected to db: ${sql.name}`);
  }

  async getAll(): Promise<LessonSummary[]> {
    const lessons = await sql`
      SELECT id, type, title, level, image, description
      FROM "Lesson"."Lessons"`;

    return lessons.map((l) => ({
      id: l.id.toString(),
      type: l.type,
      title: l.title,
      level: l.level,
      image: l.image?.[0] ?? '',
      description: l.description ?? ''
    }));
  }
}
