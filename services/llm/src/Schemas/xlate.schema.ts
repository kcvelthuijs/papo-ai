import z from 'zod';

export const xlateSchema = z.object({
   toLanguage: z
      .string()
      .max(100, 'Name of the language exceeds the maximum of 100 characters.'),

   prompt: z.string().trim().min(1, 'Text is required.'),
});
