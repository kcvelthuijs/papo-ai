import z from 'zod';

import type { Request, Response } from 'express';
import { weatherService } from '../services/weather.service';

export const weatherController = {
   async getAll(req: Request, res: Response) {
      try {
         const response = await weatherService.getAll();
         res.json(response);
      } catch (error) {
         res.status(500).json({
            error: `Failed to retrieve weather forecast.\n${error}`,
         });
      }
   },
};
