import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

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
		const rawData = request.body;
		const data = monitorSchema.parse(rawData);
		await monitorService.create(data.name, data.url, data.interval);
		reply.status(201).send();
	}
}
