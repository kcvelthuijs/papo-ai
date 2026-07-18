import z from 'zod';

export const exerciseIdSchema = z.object({
  lessonId: z.number('Lesson id must be filled in and numeric.'),
  seqNumber: z.number('Sequence number number must be filled in and numeric.'),
});
