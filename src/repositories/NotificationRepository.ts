import type { Notification } from "../models/Notification";

export interface NotificationRepository {
	create(notification: Notification[]): Promise<void>;
	find(id: string): Promise<Notification | undefined>;
	findAll(): Promise<Notification[]>;
	delete(id: string): Promise<void>;
	update(monitorId: string, notifications: Notification[]): Promise<void>;
}
