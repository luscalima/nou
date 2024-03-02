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

	async update(notification: Notification) {
		await db
			.updateTable("notifications")
			.set(notification)
			.where("id", "=", notification.id)
			.execute();
	}
}
