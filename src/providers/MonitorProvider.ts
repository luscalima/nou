import { db } from '../database'
import { Monitor } from '../models/Monitor'
import type { MonitorRepository } from '../repositories/MonitorRepository'

export class MonitorProvider implements MonitorRepository {
  async create(monitor: Omit<Monitor, 'id'>) {
    await db.insertInto('monitors').values(monitor).execute()
  }

  async find(id: string) {
    return await db
      .selectFrom('monitors')
      .select(['id', 'name', 'url', 'interval'])
      .where('id', '=', id)
      .executeTakeFirst()
  }

  async findAll() {
    return await db.selectFrom('monitors').selectAll().execute()
  }

  async delete(id: string) {
    await db.deleteFrom('monitors').where('id', '=', id).execute()
  }

  async update(monitor: Monitor) {
    await db
      .updateTable('monitors')
      .set(monitor)
      .where('id', '=', monitor.id)
      .execute()
  }
}
