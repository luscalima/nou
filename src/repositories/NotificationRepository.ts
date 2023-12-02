import type { Notification } from '../models/Notification'

export interface NotificationRepository {
  create(notification: Omit<Notification, 'id'>): Promise<void>
  find(id: string): Promise<Notification | undefined>
  findAll(): Promise<Notification[]>
  delete(id: string): Promise<void>
  update(notification: Notification): Promise<void>
}
