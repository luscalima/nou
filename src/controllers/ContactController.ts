import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { PaginationSchema } from "../hooks";
import { InvalidInputError } from "../models/errors";
import { ContactProvider } from "../providers/ContactProvider";
import { ContactService } from "../services/ContactService";
import { HttpStatus } from "../utils";

const contactProvider = new ContactProvider();
const contactService = new ContactService(contactProvider);

const contactSchema = z.object({
	id: z.string().uuid().optional(),
	name: z.string().min(3),
	email: z.string().email(),
});

export class ContactController {
	static async create(request: FastifyRequest, reply: FastifyReply) {
		const input = contactSchema.safeParse(request.body);

		if (!input.success) {
			const info = input.error.errors.at(0);
			throw new InvalidInputError(`${info?.path}: ${info?.message}`);
		}

		const contact = await contactService.create(
			input.data.name,
			input.data.email,
		);

		return reply.status(HttpStatus.CREATED).send(contact);
	}

	static async find(
		request: FastifyRequest<{ Params: { id: string } }>,
		reply: FastifyReply,
	) {
		const contact = await contactService.find(request.params.id);

		return reply.status(HttpStatus.OK).send(contact);
	}

	static async findAll(
		request: FastifyRequest<{ Querystring: PaginationSchema }>,
		reply: FastifyReply,
	) {
		const { page, limit } = request.query;
		const contacts = await contactService.findAll(page, limit);

		return reply.status(HttpStatus.OK).send({
			meta: {
				page,
				limit,
			},
			data: contacts,
		});
	}

	static async update(request: FastifyRequest, reply: FastifyReply) {
		const input = contactSchema.safeParse(request.body);

		if (!input.success) {
			const info = input.error.errors.at(0);
			throw new InvalidInputError(`${info?.path}: ${info?.message}`);
		}

		if (!input.data.id) {
			throw new InvalidInputError("id: required");
		}

		const contact = await contactService.update(
			input.data.id,
			input.data.name,
			input.data.email,
		);

		return reply.status(HttpStatus.OK).send(contact);
	}

	static async delete(
		request: FastifyRequest<{ Params: { id: string } }>,
		reply: FastifyReply,
	) {
		await contactService.delete(request.params.id);

		return reply.status(HttpStatus.NO_CONTENT).send();
	}
}
