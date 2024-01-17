import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { MonitorProvider } from "../providers/MonitorProvider";
import { MonitorService } from "../services/MonitorService";
import { ErrorBuilder, ErrorMessage, ErrorValidator } from "../utils/errors";

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
			return reply.status(400).send({
				message: ErrorMessage.INVALID_INPUT,
				errors: input.error.flatten().fieldErrors,
			});
		}

		try {
			const monitor = await monitorService.create(
				input.data.name,
				input.data.url,
				input.data.interval,
			);
			return reply.status(201).send(monitor);
		} catch (error: any) {
			const databaseError = ErrorValidator.isDatabaseError(error);

			if (databaseError) {
				return reply.status(500).send({
					message: ErrorMessage.INTERNAL_SERVER_ERROR,
					errors: {
						[ErrorBuilder.dbContraintKey(error.constraint)]:
							ErrorBuilder.dbSanitizeMessage(error.message),
					},
				});
			}

			return reply.status(500).send();
		}
	}
}
