import { db } from "../database";
import { DuplicatedKeyError } from "../models/errors";
import { Monitor } from "../models/Monitor";
import type { MonitorRepository } from "../repositories/MonitorRepository";

export class MonitorProvider implements MonitorRepository {
	async create(monitor: Monitor) {
		try {
			await db.insertInto("monitors").values(monitor).execute();
		} catch (error: any) {
			const duplicatedError = this.isDuplicatedKeyError(error);

			if (duplicatedError) {
				throw new DuplicatedKeyError(duplicatedError.detail);
			}

			throw error;
		}
	}

	async find(id: string) {
		return await db
			.selectFrom("monitors")
			.select(["id", "name", "url", "interval"])
			.where("id", "=", id)
			.executeTakeFirst();
	}

	async findAll() {
		return await db.selectFrom("monitors").selectAll().execute();
	}

	async delete(id: string) {
		await db.deleteFrom("monitors").where("id", "=", id).execute();
	}

	async update(monitor: Monitor) {
		try {
			const updatedAt = new Date();
			await db
				.updateTable("monitors")
				.set({ ...monitor, updatedAt })
				.where("id", "=", monitor.id)
				.execute();
		} catch (error: any) {
			const duplicatedError = this.isDuplicatedKeyError(error);

			if (duplicatedError) {
				throw new DuplicatedKeyError(duplicatedError.detail);
			}

			throw error;
		}
	}

	private isDuplicatedKeyError(error: any) {
		if (error.code !== "23505") {
			return;
		}

		const key = error?.constraint?.split("_")[1] ?? "Key value";

		return {
			detail: `${key} already exists`,
		};
	}
}
