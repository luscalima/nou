import { Kysely, sql } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
  db.schema
    .createTable('monitors')
    .addColumn('id', 'uuid', col =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`),
    )
    .addColumn('name', 'varchar', col => col.notNull())
    .addColumn('url', 'varchar', col => col.notNull().unique())
    .addColumn('interval', 'integer', col => col.notNull().defaultTo(1)) // minutes
    .addColumn('createdAt', 'timestamp', col =>
      col.notNull().defaultTo(sql`now()`),
    )
    .addColumn('updatedAt', 'timestamp', col =>
      col.notNull().defaultTo(sql`now()`),
    )
    .execute()
}

export async function down(db: Kysely<any>): Promise<void> {
  db.schema.dropTable('monitors').execute()
}
