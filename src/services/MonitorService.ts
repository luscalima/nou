import { v4 as uuid } from "uuid";

import { NotFoundError } from "../models/errors";
import { Monitor } from "../models/Monitor";
import { Notification } from "../models/Notification";
import { MonitorRepository } from "../repositories/MonitorRepository";
import { NotificationRepository } from "../repositories/NotificationRepository";

export class MonitorService {
	constructor(
		private monitorProvider: MonitorRepository,
		private notificationProvider: NotificationRepository,
	) {}

	async create(
		name: string,
		url: string,
		interval: number,
		contacts: string[],
	): Promise<Monitor> {
		const monitorId = uuid();
		const monitor = new Monitor(monitorId, name, url, interval);
		await this.monitorProvider.create(monitor);

		if (contacts.length) {
			const notifications = contacts.map(
				contactId => new Notification(uuid(), monitorId, contactId),
			);
			await this.notificationProvider.create(notifications);
		}

		return monitor;
	}

	async find(id: string): Promise<Monitor> {
		const monitor = await this.monitorProvider.find(id);

		if (!monitor) {
			throw new NotFoundError(`Monitor with id ${id} not found`);
		}

		return monitor;
	}

	async findAll(page: number, limit: number): Promise<Monitor[]> {
		const offset = (page - 1) * limit;

		return await this.monitorProvider.findAll(offset, limit);
	}

	async update(
		id: string,
		name: string,
		url: string,
		interval: number,
		contacts: string[],
	): Promise<Monitor> {
		const monitor = new Monitor(id, name, url, interval);
		await this.monitorProvider.update(monitor);
		const notifications = contacts.map(
			contactId => new Notification(uuid(), monitor.id, contactId),
		);
		await this.notificationProvider.update(monitor.id, notifications);

		return monitor;
	}

	async delete(id: string): Promise<void> {
		await this.monitorProvider.delete(id);
	}
}
