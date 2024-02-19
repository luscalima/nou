import { db } from '../database'
import { Contact } from '../models/Contact'
import type { ContactRepository } from '../repositories/ContactRepository'

export class ContactProvider implements ContactRepository {
  async create(contact: Omit<Contact, 'id'>) {
    await db.insertInto('contacts').values(contact).execute()
  }

  async find(id: string) {
    return await db
      .selectFrom('contacts')
      .select(['id', 'name', 'email'])
      .where('id', '=', id)
      .executeTakeFirst()
  }

  async findAll() {
    return await db.selectFrom('contacts').selectAll().execute()
  }

  async delete(id: string) {
    await db.deleteFrom('contacts').where('id', '=', id).execute()
  }

  async update(contact: Contact) {
    await db
      .updateTable('contacts')
      .set(contact)
      .where('id', '=', contact.id)
      .execute()
  }
}
