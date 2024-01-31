import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from "fastify";
import { z } from "zod";

import { InvalidInputError } from "../models/errors";

const idParamSchema = z.object({
	id: z.string().uuid(),
});

export type IdParamSchema = z.infer<typeof idParamSchema>;

export function idParamHook(
	request: FastifyRequest<{ Params: IdParamSchema }>,
	_: FastifyReply,
	done: HookHandlerDoneFunction,
) {
	const params = idParamSchema.safeParse(request.params);

	if (!params.success) {
		const info = params.error.errors.at(0);
		throw new InvalidInputError(`id: ${info?.message}`);
	}

	done();
}
