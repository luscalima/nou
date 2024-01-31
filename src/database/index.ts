import "dotenv/config";

import { Kysely, PostgresDialect } from "kysely";
import pg from "pg";

import type { DB } from "./db";

const dialect = new PostgresDialect({
	pool: new pg.Pool({
		host: process.env.DATABASE_HOST,
		port: Number(process.env.DATABASE_PORT),
		user: process.env.DATABASE_USER,
		password: process.env.DATABASE_PASSWORD,
		database: process.env.DATABASE_NAME,
		max: 10,
	}),
});

export const db = new Kysely<DB>({
	dialect,
});
