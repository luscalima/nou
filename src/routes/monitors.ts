import { FastifyInstance } from "fastify";

import { MonitorController } from "../controllers/MonitorController";
import { idParamHook, paginationHook } from "../hooks";

export async function monitorRoutes(fastify: FastifyInstance) {
	fastify.post("/", MonitorController.create);
	fastify.get("/:id", { preHandler: [idParamHook] }, MonitorController.find);
	fastify.get(
		"/",
		{
			preHandler: [paginationHook],
		},
		MonitorController.findAll,
	);
	fastify.put("/", MonitorController.update);
	fastify.delete(
		"/:id",
		{ preHandler: [idParamHook] },
		MonitorController.delete,
	);
}
