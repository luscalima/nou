import { v4 as uuid } from "uuid";

import { Monitor } from "../models/Monitor";
import { MonitorRepository } from "../repositories/MonitorRepository";

export class MonitorService {
	constructor(private provider: MonitorRepository) {}

	async create(
		name: string,
		url: string,
		interval: number,
	): Promise<Monitor> {
		const id = uuid();
		const monitor = new Monitor(id, name, url, interval);
		await this.provider.create(monitor);
		return monitor;
	}

	async update(
		id: string,
		name: string,
		url: string,
		interval: number,
	): Promise<Monitor> {
		const monitor = new Monitor(id, name, url, interval);
		await this.provider.update(monitor);
		return monitor;
	}

	isDuplicatedKeyError(error: any) {
		if (error.code !== "23505") {
			return;
		}

		const key = error?.constraint?.split("_")[1] ?? "Key value";

		return {
			message: `${key} already exists`,
		};
	}
}
