import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from "fastify";
import { z } from "zod";

import { PaginationError } from "../models/errors";

const paginationSchema = z.object({
	page: z.number({ coerce: true }).positive().default(1),
	limit: z.number({ coerce: true }).positive().default(10),
});

export type PaginationSchema = z.infer<typeof paginationSchema>;

export function paginationHook(
	request: FastifyRequest<{ Querystring: PaginationSchema }>,
	_: FastifyReply,
	done: HookHandlerDoneFunction,
) {
	const input = paginationSchema.safeParse(request.query);

	if (!input.success) {
		const info = input.error.errors.at(0);
		throw new PaginationError(`${info?.path}: ${info?.message}`);
	}

	request.query.page = input.data.page;
	request.query.limit = input.data.limit;

	done();
}
