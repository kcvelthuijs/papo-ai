import z from 'zod';

import type { Request, Response } from 'express';
import { lessonService } from '../services/lesson.service';
import { idSchema } from '../schemas/id.schema';

export const lessonController = {
   async getAll(req: Request, res: Response) {
      const response = await lessonService.getAll();
      res.json({ lessons: response });
   },

   async getByID(req: Request, res: Response) {
      // test de aanwezigheid van het id
      const parseResult = idSchema.safeParse(req.body);
      if (!parseResult.success) {
         console.log(z.prettifyError(parseResult.error));
         res.status(400).json(z.prettifyError(parseResult.error));
         return;
      }

      try {
         const { id } = req.body;
         const response = await lessonService.getByID(id);

         // Geef het return-object in json terug
         res.json({
            id: response.id,
            title: response.title,
            description: response.description,
            type: response.type,
            level: response.level,
            prompt: response.prompt,
            voice: response.voice ?? '',
            avatar: response.avatar ?? '',
            speech: response.speech ?? '',
            phrases: response.phrases ?? '',
            image: response.image ?? '',
         });
      } catch (error) {
         res.status(500).json({
            error: `Failed to retrieve lesson.\n${error}`,
         });
      }
   },
};
