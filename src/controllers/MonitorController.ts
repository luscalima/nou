import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { InvalidInputError } from "../models/errors";
import { MonitorProvider } from "../providers/MonitorProvider";
import { MonitorService } from "../services/MonitorService";

const monitorProvider = new MonitorProvider();
const monitorService = new MonitorService(monitorProvider);

const monitorSchema = z.object({
	name: z.string().min(3),
	url: z.string().url(),
	interval: z.number().positive(),
});

export class MonitorController {
	static async create(request: FastifyRequest, reply: FastifyReply) {
		const input = monitorSchema.safeParse(request.body);

		if (!input.success) {
			const info = input.error.errors.at(0);
			const error = new InvalidInputError(
				`${info?.path}: ${info?.message}`,
			);
			return reply.status(error.status).send(error.toJSON());
		}

		try {
			const monitor = await monitorService.create(
				input.data.name,
				input.data.url,
				input.data.interval,
			);
			return reply.status(201).send(monitor);
		} catch (error: any) {
			return reply.status(error.status).send(error.toJSON());
		}
	}
}
