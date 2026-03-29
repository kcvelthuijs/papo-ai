import fs from "fs"
import path from "path"
import z from "zod"

import { imageSchema } from "./imageSchema"
import { type ImageSize } from "webtypes/src/Types/Interfaces/Images"
import type { FastifyRequest, FastifyReply } from "fastify"

export type ImageRequestBody = {
  tree: string[]
  size: ImageSize
}
export const imageController = {
  async getImage(
    req: FastifyRequest<{ Body: ImageRequestBody }>,
    reply: FastifyReply
  ) {
    const parseResult = imageSchema.safeParse(req.body)
    if (!parseResult.success) {
      return reply.status(400).send(z.prettifyError(parseResult.error))
    }

    // get data from request
    const { name, tree, size } = parseResult.data

    // Get path to the file
    const imagePath = tree.join("/").toLowerCase()
    const fullPath = path.join(
      __dirname,
      "..",
      "public",
      imagePath,
      size !== "none" ? size : "",
      name
    )

    if (!fs.existsSync(fullPath)) {
      return reply.status(400).send(`Image ${fullPath} not found!`)
    }

    let contentType = "application/octet-stream"
    const ext = path.extname(fullPath).toLowerCase()
    switch (ext) {
      case ".png":
        contentType = "image/png"
        break
      case ".jpg":
      case ".jpeg":
        contentType = "image/jpeg"
        break
      case ".svg":
        contentType = "image/svg+xml"
        break
    }
    reply.type(contentType).send(fs.createReadStream(fullPath))
  },
}
