import type { Contact } from "../models/Contact";

export interface ContactRepository {
	create(contact: Contact): Promise<void>;
	find(id: string): Promise<Contact | undefined>;
	findAll(offset: number, limit: number): Promise<Contact[]>;
	delete(id: string): Promise<void>;
	update(contact: Contact): Promise<void>;
}
