import type { Request, Response } from 'express';
import { xlateService } from '../services/xlate.services';
import { xlateSchema } from '../schemas/xlate.schema';

export const xlateController = {
   async getTranslation(req: Request, res: Response) {
      const parseResult = xlateSchema.safeParse(req.body);

      if (!parseResult.success) {
         console.log(parseResult.error.message);
         res.status(400).json(parseResult.error.format);
         return;
      }

      try {
         const { toLanguage, prompt } = req.body;
         const data = await xlateService.translate(toLanguage, prompt);

         // Geef het return-object in json terug
         res.json({ result: data.result });
      } catch (error) {
         res.status(500).json({ error: 'Failed to generate a response.' });
      }
   },
};
