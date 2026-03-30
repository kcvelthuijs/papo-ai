import z from 'zod';

export const chatSchema = z.object({
   role: z.enum(['system', 'assistant', 'user', 'developer']),

   prompt: z.string().trim().min(1, 'Prompt is required.'),

   instructions: z.string().trim(),

   responseId: z.string(),
});
