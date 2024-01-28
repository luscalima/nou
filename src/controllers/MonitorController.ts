import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { PaginationSchema } from "../hooks";
import { InvalidInputError } from "../models/errors";
import { MonitorProvider } from "../providers/MonitorProvider";
import { MonitorService } from "../services/MonitorService";
import { HttpStatus } from "../utils";

const monitorProvider = new MonitorProvider();
const monitorService = new MonitorService(monitorProvider);

const monitorSchema = z.object({
	id: z.string().uuid().optional(),
	name: z.string().min(3),
	url: z.string().url(),
	interval: z.number().positive(),
});

export class MonitorController {
	static async create(request: FastifyRequest, reply: FastifyReply) {
		const input = monitorSchema.safeParse(request.body);

		if (!input.success) {
			const info = input.error.errors.at(0);
			throw new InvalidInputError(`${info?.path}: ${info?.message}`);
		}

		const monitor = await monitorService.create(
			input.data.name,
			input.data.url,
			input.data.interval,
		);

		return reply.status(201).send(monitor);
	}

	static async findAll(
		request: FastifyRequest<{ Querystring: PaginationSchema }>,
		reply: FastifyReply,
	) {
		const { page, limit } = request.query;
		const monitors = await monitorService.findAll(page, limit);

		return reply.status(HttpStatus.OK).send({
			meta: {
				page,
				limit,
			},
			data: monitors,
		});
	}

	static async update(request: FastifyRequest, reply: FastifyReply) {
		const input = monitorSchema.safeParse(request.body);

		if (!input.success) {
			const info = input.error.errors.at(0);
			throw new InvalidInputError(`${info?.path}: ${info?.message}`);
		}

		if (!input.data.id) {
			throw new InvalidInputError("id: required");
		}

		const monitor = await monitorService.update(
			input.data.id,
			input.data.name,
			input.data.url,
			input.data.interval,
		);

		return reply.status(HttpStatus.OK).send(monitor);
	}
}
