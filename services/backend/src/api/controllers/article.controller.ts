import z from "zod";

import type { Request, Response } from "express";
import { getArticleByCategorySchema } from "../schemas/article.schema";
import { articleService } from "../services/article.service";

export const articleController = {
  async getByCategory(req: Request, res: Response) {
    const parseResult = getArticleByCategorySchema.safeParse(req.body);
    if (!parseResult.success) {
      res.status(400).json(z.prettifyError(parseResult.error));
      return;
    }

    try {
      const { category } = req.body;
      const response = await articleService.getArticleByCategory(category);

      // Geef het return-object in json terug
      res.json({
        title: response.title,
        desciption: response.description,
        text: response.text,
        link: response.link,
        date: response.pubDate,
        image: response.imageUrl,
      });
    } catch (error) {
      res.status(500).json({
        error: `Failed to retrieve article.\n${error}`,
      });
    }
  },
};
