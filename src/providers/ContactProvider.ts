import { db } from "../database";
import { Contact } from "../models/Contact";
import type { ContactRepository } from "../repositories/ContactRepository";

export class ContactProvider implements ContactRepository {
	async create(contact: Contact) {
		await db.insertInto("contacts").values(contact).execute();
	}

	async find(id: string) {
		return await db
			.selectFrom("contacts")
			.select(["id", "name", "email"])
			.where("id", "=", id)
			.executeTakeFirst();
	}

	async findAll(offset: number, limit: number) {
		return await db
			.selectFrom("contacts")
			.select(["id", "name", "email"])
			.limit(limit)
			.offset(offset)
			.execute();
	}

	async delete(id: string) {
		await db.deleteFrom("contacts").where("id", "=", id).execute();
	}

	async update(contact: Contact) {
		await db
			.updateTable("contacts")
			.set(contact)
			.where("id", "=", contact.id)
			.execute();
	}
}
