import fs from "fs";
import path from "path";
import z from "zod";
import { pipeline } from "node:stream";
import { promisify } from "node:util";

import { imageSchema, type ImageSize } from "./imageSchema";
import type { FastifyRequest, FastifyReply } from "fastify";
import type { ServerResponse, IncomingMessage } from "node:http";

export type ImageRequestBody = {
  name: string;
  tree: string[];
  size: ImageSize;
};

const pump = promisify(pipeline);

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

    if (!fs.existsSync(fullPath)) {
      return reply.status(400).send(`Image ${fullPath} not found!`);
    }

    let contentType = "application/octet-stream";
    const ext = path.extname(fullPath).toLowerCase();
    switch (ext) {
      case ".png":
        contentType = "image/png";
        break;
      case ".jpg":
      case ".jpeg":
        contentType = "image/jpeg";
        break;
      case ".svg":
        contentType = "image/svg+xml";
        break;
    }

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
  },
};
