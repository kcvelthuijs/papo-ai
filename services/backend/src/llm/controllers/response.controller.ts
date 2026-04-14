import type { Request, Response } from "express";
import { ResponseService } from "../services/response.service";
import { ResponseSchema } from "../schemas/response.schema";

export const ResponseController = {
  async sendMessage(req: Request, res: Response) {
    const parseResult = ResponseSchema.safeParse(req.body);

    if (!parseResult.success) {
      console.log(parseResult.error.message);
      res.status(400).json(parseResult.error.format);
      return;
    }

    try {
      const { role, prompt, instructions, responseId } = req.body;

      const response = await ResponseService.sendMessage(
        role,
        prompt,
        instructions,
        responseId
      );

      console.log("response", response);
      // Geef het return-object in json terug
      res.json({
        id: response.id,
        role: response.role,
        message: response.message
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to generate a response." });
    }
  }
};
