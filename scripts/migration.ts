import fs from 'fs/promises'
import path from 'path'

const migrationName = process.argv[2]
const migrationTimestamp = new Date()
  .toISOString()
  .replace(/[-:T]/g, '')
  .replace(/\..+/, '')
const migrationFileName = `${migrationTimestamp}-${migrationName}.ts`
const migrationTemplate = `import { Kysely } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
  // Migration code
}

export async function down(db: Kysely<any>): Promise<void> {
  // Migration code
}
`

const migrationsDir = path.join(
  __dirname,
  '..',
  'src',
  'database',
  'migrations',
)
const migrationFilePath = path.join(migrationsDir, migrationFileName)

async function main() {
  await fs.mkdir(migrationsDir, { recursive: true })
  await fs.writeFile(migrationFilePath, migrationTemplate)
}

main().catch(error => {
  console.error(error)
  process.exit(1)
})
