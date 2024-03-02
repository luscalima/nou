import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
	db.schema
		.createTable("notifications")
		.addColumn("id", "uuid", col => col.primaryKey().notNull())
		.addColumn("monitorId", "uuid", col =>
			col.notNull().unique().references("monitors.id"),
		)
		.addColumn("contactId", "uuid", col =>
			col.notNull().unique().references("contacts.id"),
		)
		.addColumn("createdAt", "timestamp", col =>
			col.notNull().defaultTo(sql`now()`),
		)
		.addColumn("updatedAt", "timestamp", col =>
			col.notNull().defaultTo(sql`now()`),
		)
		.execute();
}

export async function down(db: Kysely<any>): Promise<void> {
	db.schema.dropTable("notifications").execute();
}
