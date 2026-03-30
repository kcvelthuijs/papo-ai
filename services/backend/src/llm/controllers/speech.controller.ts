import z from "zod";
import type { Request, Response } from "express";

import { speechService } from "../services/speech.service";
import { SpeechReturnStateEnum } from "../types/speech.types";

const speechSchema = z.object({
  text: z.string().trim().min(1, "Text is required."),

  voice: z.enum([
    "alloy",
    "ash",
    "ballad",
    "cedar",
    "coral",
    "echo",
    "fable",
    "marin",
    "nova",
    "onyx",
    "sage",
    "shimmer",
    "verse",
  ]),

  instructions: z.string().trim().optional(),

  speed: z.number().min(0.5).max(1.5).optional(),
});

export const speechController = {
  async speakMessage(req: Request, res: Response) {
    const parseResult = speechSchema.safeParse(req.body);

    if (!parseResult.success) {
      res.status(400).json(parseResult.error.format);
      return;
    }

    try {
      const { text, voice, instructions, speed } = req.body;
      const response = await speechService.speak(
        text,
        voice,
        instructions,
        speed,
      );

      if (response.state == SpeechReturnStateEnum.ok) {
        res.setHeader("Content-Type", "audio/mpeg");
        res.send(response.audio);
      } else res.status(500).json({ error: "Failed to retrieve " });
    } catch (error) {
      res.status(500).json({ error: "Failed to generate a response." });
    }
  },
};
