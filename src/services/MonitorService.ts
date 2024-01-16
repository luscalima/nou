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
}
