import z, { type ZodTypeAny } from 'zod';

const numericString = (schema: ZodTypeAny) =>
   z.preprocess((a) => {
      if (typeof a === 'string') {
         return parseInt(a, 10);
      } else if (typeof a === 'number') {
         return a;
      } else {
         return undefined;
      }
   }, schema);

export const idSchema = z.object({
   id: numericString(z.number().positive()),
});
