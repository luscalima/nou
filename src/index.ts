import fastify from "fastify";

import { registerRoutes } from "./routes";

const app = fastify();

registerRoutes(app);

await app.listen({
	port: 3000,
});
