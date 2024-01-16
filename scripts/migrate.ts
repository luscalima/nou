import "dotenv/config";

import { promises as fs } from "fs";
import {
	FileMigrationProvider,
	Kysely,
	Migrator,
	PostgresDialect,
} from "kysely";
import { DB } from "kysely-codegen";
import * as path from "path";
import pg from "pg";
import url from "url";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function migrateToLatest() {
	const db = new Kysely<DB>({
		dialect: new PostgresDialect({
			pool: new pg.Pool({
				host: process.env.DATABASE_HOST,
				port: Number(process.env.DATABASE_PORT),
				user: process.env.DATABASE_USER,
				password: process.env.DATABASE_PASSWORD,
				database: process.env.DATABASE_NAME,
				max: 10,
			}),
		}),
	});

	const migrator = new Migrator({
		db,
		provider: new FileMigrationProvider({
			fs,
			path,
			migrationFolder: path.join(
				__dirname,
				"..",
				"src",
				"database",
				"migrations",
			),
		}),
	});

	const { error, results } = await migrator.migrateToLatest();

	results?.forEach(it => {
		if (it.status === "Success") {
			console.log(
				`migration "${it.migrationName}" was executed successfully`,
			);
		} else if (it.status === "Error") {
			console.error(`failed to execute migration "${it.migrationName}"`);
		}
	});

	if (error) {
		console.error("failed to migrate");
		console.error(error);
		process.exit(1);
	}

	await db.destroy();
}

migrateToLatest();
