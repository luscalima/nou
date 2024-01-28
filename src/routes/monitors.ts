import { FastifyInstance } from "fastify";

import { MonitorController } from "../controllers/MonitorController";
import { paginationHook } from "../hooks";

export async function monitorRoutes(fastify: FastifyInstance) {
	fastify.post("/", MonitorController.create);
	fastify.get("/:id", MonitorController.find);
	fastify.get(
		"/",
		{
			preHandler: [paginationHook],
		},
		MonitorController.findAll,
	);
	fastify.put("/", MonitorController.update);
}
