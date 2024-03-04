import { db } from "../database";
import { Notification } from "../models/Notification";

export class NotificationProvider {
	async create(notification: Notification[]) {
		await db.insertInto("notifications").values(notification).execute();
	}

	async find(id: string) {
		return await db
			.selectFrom("notifications")
			.select(["id", "monitorId", "contactId"])
			.where("id", "=", id)
			.executeTakeFirst();
	}

	async findAll() {
		return await db.selectFrom("notifications").selectAll().execute();
	}

	async delete(id: string) {
		await db.deleteFrom("notifications").where("id", "=", id).execute();
	}

	async update(monitorId: string, notifications: Notification[]) {
		await db.transaction().execute(async trx => {
			await trx
				.deleteFrom("notifications")
				.where("monitorId", "=", monitorId)
				.execute();
			if (!notifications.length) {
				return;
			}
			await trx
				.insertInto("notifications")
				.values(notifications)
				.execute();
		});
	}
}
