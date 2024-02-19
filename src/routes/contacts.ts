import { FastifyInstance } from "fastify";

import { ContactController } from "../controllers/ContactController";
import { idParamHook, paginationHook } from "../hooks";

export async function contactRoutes(fastify: FastifyInstance) {
	fastify.post("/", ContactController.create);
	fastify.get("/:id", { preHandler: [idParamHook] }, ContactController.find);
	fastify.get(
		"/",
		{
			preHandler: [paginationHook],
		},
		ContactController.findAll,
	);
	fastify.put("/", ContactController.update);
	fastify.delete(
		"/:id",
		{ preHandler: [idParamHook] },
		ContactController.delete,
	);
}
