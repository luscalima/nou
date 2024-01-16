import { FastifyInstance } from "fastify";

import { MonitorController } from "../controllers/MonitorController";

export async function monitorRoutes(fastify: FastifyInstance) {
	fastify.post("/", MonitorController.create);
}
