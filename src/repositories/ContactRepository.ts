import type { Contact } from '../models/Contact'

export interface ContactRepository {
  create(contact: Omit<Contact, 'id'>): Promise<void>
  find(id: string): Promise<Contact | undefined>
  findAll(): Promise<Contact[]>
  delete(id: string): Promise<void>
  update(contact: Contact): Promise<void>
}
