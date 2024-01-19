import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { MonitorProvider } from "../providers/MonitorProvider";
import { MonitorService } from "../services/MonitorService";
import { ErrorMessage, ProblemDetails } from "../utils/errors";

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
			const error = input.error.errors.at(0);
			return reply
				.status(400)
				.send(
					new ProblemDetails(
						ErrorMessage.INVALID_INPUT,
						400,
						`${error?.path}: ${error?.message}`,
					),
				);
		}

		try {
			const monitor = await monitorService.create(
				input.data.name,
				input.data.url,
				input.data.interval,
			);
			return reply.status(201).send(monitor);
		} catch (error: any) {
			const duplicatedError = monitorService.isDuplicatedKeyError(error);

			if (duplicatedError) {
				return reply
					.status(409)
					.send(
						new ProblemDetails(
							ErrorMessage.DUPLICATED_KEY,
							409,
							duplicatedError.message,
						),
					);
			}

			return reply.status(500).send();
		}
	}
}
