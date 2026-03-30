import type { Request, Response } from "express";
import { xcribeService } from "../services/xcribe.service";

export const xscribeController = {
  async getText(req: Request, res: Response) {
    try {
      const language = req.headers["x-language"]?.toString() || "en";

      console.log("xscribeController: get data");
      // req is een ReadableStream van de hele Blob
      const chunks: Buffer[] = [];
      for await (const chunk of req) {
        chunks.push(chunk);
      }

      const audioBuffer = Buffer.concat(chunks);
      const audioBlob = new Blob([audioBuffer], { type: "audio/webm" });
      console.log("xscribeController: call service");

      const response = await xcribeService.getText({
        file: audioBlob,
        language,
      });
      console.log("xscribeController: return", response.text);

      res.json({ text: response.text });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to generate a response." });
    }
  },
};
