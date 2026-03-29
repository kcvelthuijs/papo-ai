import type { FastifyInstance } from "fastify"
import { imageController } from "./imageController"

// Dit is de "router" equivalent in Fastify
export async function imageRoutes(fastify: FastifyInstance) {
  // Get endpoint voor dynamische paths
  fastify.post("/api/images", imageController.getImage)
}
