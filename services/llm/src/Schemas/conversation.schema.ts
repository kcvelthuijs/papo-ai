import z from 'zod';

export const ConversationIdSchema = z.object({
   conversationId: z.string(),
});

export const createConversationSchema = z.object({
   appid: z
      .string()
      .trim()
      .min(1, 'Application ID is required.')
      .max(50, 'Application ID is exceeding the maximum of 50 characters.'),

   userid: z
      .string()
      .trim()
      .min(1, 'User ID is required.')
      .max(50, 'User ID is exceeding the maximum of 50 characters.'),

   description: z.string().trim(),

   prompt: z.string().trim().min(1, 'Prompt is required.'),
});

export const addConversationMessageSchema = z.object({
   role: z.enum(
      ['system', 'assistant', 'user', 'developer'],
      'Role must be one of system, assistant, user or developer.'
   ),

   prompt: z.string().trim().min(1, 'Prompt is required.'),
});
