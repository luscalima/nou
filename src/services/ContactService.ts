import { v4 as uuid } from "uuid";

import { Contact } from "../models/Contact";
import { NotFoundError } from "../models/errors";
import { ContactRepository } from "../repositories/ContactRepository";

export class ContactService {
	constructor(private provider: ContactRepository) {}

	async create(name: string, email: string) {
		const id = uuid();
		const contact = new Contact(id, name, email);
		await this.provider.create(contact);
		return contact;
	}

	async find(id: string) {
		const contact = await this.provider.find(id);

		if (!contact) {
			throw new NotFoundError(`Contact with id ${id} not found`);
		}

		return contact;
	}

	async findAll(page: number, limit: number) {
		const offset = (page - 1) * limit;

		return await this.provider.findAll(offset, limit);
	}

	async update(id: string, name: string, email: string) {
		const contact = new Contact(id, name, email);
		await this.provider.update(contact);
		return contact;
	}

	async delete(id: string) {
		return await this.provider.delete(id);
	}
}
