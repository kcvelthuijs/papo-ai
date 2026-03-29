import path from "path"
import Fastify from "fastify"
import fastifyCors from "@fastify/cors"
import fastifyStatic from "@fastify/static"
import dotenv from "dotenv"
import { imageRoutes } from "./routes"

// CORS
const fastify = Fastify({ logger: true })
fastify.register(fastifyCors, { origin: "*" })

// Serve static files
fastify.register(fastifyStatic, {
  root: path.join(__dirname, "..", "public"),
  prefix: "/images/",
})

// Registreer "router"
fastify.register(imageRoutes)

// process environment data
const result = dotenv.config({ debug: true, override: true })
if (result.error) throw result.error

// get port for the service
const cdnport = process.env.CDNPORT || "3001"
const listenPort: number =
  cdnport == "" || parseInt(cdnport) == 0 ? 3001 : parseInt(cdnport)

// Start server
fastify.listen({ port: listenPort }).then(() => {
  console.log(`Images server is listening on http://localhost:${listenPort}`)
})
