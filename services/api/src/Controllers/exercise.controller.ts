import type { Request, Response } from 'express';
import z from 'zod';

import { exerciseService } from '../Services/exercise.service';
import { idSchema } from '../Schemas/id.schema';
import { exerciseIdSchema } from '../Schemas/exercise.schema';

export const exerciseController = {
  async getAll(req: Request, res: Response) {
    const response = await exerciseService.getAll();
    res.json({ exercises: response });
  },

  async getByLessonId(req: Request, res: Response) {
    // test de aanwezigheid van de lesson id
    const parseResult = idSchema.safeParse(req.body);
    if (!parseResult.success) {
      console.log(z.prettifyError(parseResult.error));
      res.status(400).json(z.prettifyError(parseResult.error));
      return;
    }

    try {
      const { id } = req.body;
      const response = await exerciseService.getByLessonId(id);

      // Geef het return-object in json terug
      res.json({ exercises: response });
    } catch (error) {
      res.status(500).json({
        error: `Failed to retrieve lesson.\n${error}`,
      });
    }
  },

  async getByID(req: Request, res: Response) {
    // test de aanwezigheid van de exercise id
    const parseResult = exerciseIdSchema.safeParse(req.body);
    if (!parseResult.success) {
      console.log(z.prettifyError(parseResult.error));
      res.status(400).json(z.prettifyError(parseResult.error));
      return;
    }

    try {
      const { lessonId, seqNumber } = req.body;
      const response = await exerciseService.getByID(lessonId, seqNumber);

      // Geef het return-object in json terug
      res.json({ exercise: response });
    } catch (error) {
      res.status(500).json({
        error: `Failed to retrieve lesson.\n${error}`,
      });
    }
  },
};
