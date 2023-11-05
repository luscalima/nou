import { Kysely, sql } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
  db.schema
    .createTable('notifications')
    .addColumn('id', 'uuid', col =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`),
    )
    .addColumn('monitor_id', 'uuid', col =>
      col.notNull().unique().references('monitors.id'),
    )
    .addColumn('contact_id', 'uuid', col =>
      col.notNull().unique().references('contacts.id'),
    )
    .addColumn('created_at', 'timestamp', col =>
      col.notNull().defaultTo(sql`now()`),
    )
    .addColumn('updated_at', 'timestamp', col =>
      col.notNull().defaultTo(sql`now()`),
    )
    .execute()
}

export async function down(db: Kysely<any>): Promise<void> {
  db.schema.dropTable('notifications').execute()
}
