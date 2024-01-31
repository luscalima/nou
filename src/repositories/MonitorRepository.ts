import type { Monitor } from "../models/Monitor";

export interface MonitorRepository {
	create(monitor: Monitor): Promise<void>;
	find(id: string): Promise<Monitor | undefined>;
	findAll(offset: number, limit: number): Promise<Monitor[]>;
	delete(id: string): Promise<void>;
	update(monitor: Monitor): Promise<void>;
}
