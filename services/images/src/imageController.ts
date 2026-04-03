import fs from "fs";
import path from "path";
import z from "zod";
import { pipeline } from "node:stream";
import { promisify } from "node:util";

import { imageSchema, type ImageSize } from "./imageSchema";
import type { FastifyRequest, FastifyReply } from "fastify";

export type ImageRequestBody = {
  name: string;
  tree: string[];
  size: ImageSize;
};

const pump = promisify(pipeline);

const getContentType = (ext: string) => {
  switch (ext) {
    case ".png":
      return "image/png";
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".svg":
      return "image/svg+xml";
    default:
      return "application/octet-stream";
  }
};

export const imageController = {
  async getImage(
    req: FastifyRequest<{ Body: ImageRequestBody }>,
    reply: FastifyReply,
  ) {
    const parseResult = imageSchema.safeParse(req.body);
    console.log(
      "name:",
      req.body.name,
      "; tree:",
      req.body.tree.join("/"),
      ";size:",
      req.body.size,
    );
    if (!parseResult.success) {
      console.log("parseResult", parseResult.error);
      return reply.status(400).send(z.prettifyError(parseResult.error));
    }

    // get data from request
    const { name, tree, size } = parseResult.data;

    // Get path to the file
    const imagePath = tree.join("/").toLowerCase();
    const fullPath = path.join(
      __dirname,
      "..",
      "public",
      imagePath,
      size !== "none" ? size : "",
      name,
    );

    // fase 1: zoek met grootte
    if (!fs.existsSync(fullPath)) {
      // fase 2: zoek zonder grootte
      return reply.status(400).send(`Image ${fullPath} not found!`);
    }

    const ext = path.extname(fullPath).toLowerCase();
    const contentType = getContentType(ext);

    if (contentType === "image/svg+xml") {
      const svgContent = fs.readFileSync(fullPath, "utf-8");
      reply.type("image/svg+xml").send(svgContent);
    } else {
      try {
        // Stream via pipeline, handle errors netjes
        await pump(fs.createReadStream(fullPath), reply.raw);
        return reply;
      } catch (err) {
        console.error("Stream error:", err);
      }

      const stream = fs.createReadStream(fullPath);
      stream.on("error", (err) => {
        console.error("Stream error", err);
      });
    }
  },
};
