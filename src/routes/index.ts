import { FastifyInstance } from "fastify";

// Routes
import { monitorRoutes } from "./monitors";

export function registerRoutes(app: FastifyInstance) {
	app.register(monitorRoutes, { prefix: "/monitors" });
}
