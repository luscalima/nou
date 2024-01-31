import { FastifyInstance } from "fastify";

import { AppError } from "../models/errors";
// Routes
import { monitorRoutes } from "./monitors";

export function registerRoutes(app: FastifyInstance) {
	app.setErrorHandler((error, request, reply) => {
		if (error instanceof AppError) {
			return reply.status(error.status).send(error.toJSON());
		}

		return reply.status(500).send({ error: "Internal Server Error" });
	});

	app.register(monitorRoutes, { prefix: "/monitors" });
}
