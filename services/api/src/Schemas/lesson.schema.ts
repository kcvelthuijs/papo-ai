import z from 'zod';

const AvatarConfigSchema = z.object({
   sex: z.union([z.literal('man'), z.literal('woman')]).optional(),
   faceColor: z.string().optional(),
   earSize: z.string().optional(),
   hairColor: z.string().optional(),
   hairStyle: z.string().optional(),
   hairColorRandom: z.boolean().optional(),
   hatColor: z.string().optional(),
   hatStyle: z.string().optional(),
   eyeStyle: z.string().optional(),
   glassesStyle: z.string().optional(),
   noseStyle: z.string().optional(),
   mouthStyle: z.string().optional(),
   shirtStyle: z.string().optional(),
   shirtColor: z.string().optional(),
   bgColor: z.string().optional(),
   isGradient: z.boolean().optional(),
});

export const lessonSchema = z.object({
   title: z
      .string()
      .trim()
      .min(5, 'Title lesson is required.')
      .max(50, 'Lesson title cannot exceed 50 characters'),

   description: z
      .string()
      .trim()
      .min(5, 'A description for the lesson is required.'),

   introduction: z.string().trim().min(5, 'Introduction is required.'),

   prompt: z.string().trim().min(5, 'Prompt to instruct AI is required.'),

   voice: z.string().optional(),

   avatar: AvatarConfigSchema.optional(),

   speech: z
      .string()
      .trim()
      .max(250, 'Speech instructions cannot exceed 250 characters')
      .optional(),

   phrases: z.array(z.string()).optional(),

   image: z.string().optional(),
});
