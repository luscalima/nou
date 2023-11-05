import { Kysely, sql } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
  db.schema
    .createTable('contacts')
    .addColumn('id', 'uuid', col =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`),
    )
    .addColumn('name', 'varchar', col => col.notNull())
    .addColumn('email', 'varchar', col => col.notNull().unique())
    .addColumn('created_at', 'timestamp', col =>
      col.notNull().defaultTo(sql`now()`),
    )
    .addColumn('updated_at', 'timestamp', col =>
      col.notNull().defaultTo(sql`now()`),
    )
    .execute()
}

export async function down(db: Kysely<any>): Promise<void> {
  db.schema.dropTable('contacts').execute()
}
