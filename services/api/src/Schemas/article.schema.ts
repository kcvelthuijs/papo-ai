import z, { type ZodTypeAny } from 'zod';

export const getArticleByCategorySchema = z.object({
   category: z.enum(
      ['mundo', 'pais', 'desporto'],
      'Category must be one of mundo, pais or desporto.'
   ),
});
