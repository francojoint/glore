import { readFileSync } from 'node:fs'
import { join } from 'node:path'

import { defineConfig, GeneratedCacheAdapter, type Options } from '@mikro-orm/postgresql'
import { TsMorphMetadataProvider } from '@mikro-orm/reflection'
import { SeedManager } from '@mikro-orm/seeder'
import { SqlHighlighter } from '@mikro-orm/sql-highlighter'

import { env } from '@/app/config'
import { isProduction } from '@/lib/utils'

const SRC_DIR = 'src'
const BUILD_DIR = 'build'
const DB_DIR = 'db'
const CACHE_DIR = 'cache/mikro-orm'
const METADATA_FILE = 'metadata.json'
const MIGRATIONS_TABLE_NAME = '__migrations__'
const MIGRATIONS_SNAPSHOT_NAME = 'schema'
const MIGRATIONS_SUFFIX = '.migration'

const srcDir = join(__dirname, SRC_DIR)
const srcBuildDir = join(__dirname, BUILD_DIR, SRC_DIR)
const dbDir = join(srcDir, DB_DIR)
const dbBuildDir = join(srcBuildDir, DB_DIR)
const cacheDir = join(__dirname, CACHE_DIR)
const metadataFile = join(cacheDir, METADATA_FILE)

/**
 * Validates and generates a migration name in the format `<timestamp>_<name>.<suffix>`.
 */
const migrationsFileName = (timestamp: string, name?: string) => {
  if (!name) throw new Error('You must specify a migration name')
  if (!/[_a-zA-Z]+/i.test(name)) throw new Error('Migration name must contain only letters and underscores')
  return `${timestamp}_${name.toLowerCase()}${MIGRATIONS_SUFFIX}`
}

/**
 * Validates and generates a seeder name in lowercase.
 */
const seederFileName = (name?: string) => {
  if (!name) throw new Error('You must specify a seeder name')
  if (!/[-\w]+/i.test(name)) throw new Error('Seeder name must contain only letters and hyphens')
  return name.toLowerCase()
}

/**
 * Options for metadata.
 */
const metadataOptions: Options = {
  metadataCache: {
    enabled: true,
    adapter: GeneratedCacheAdapter,
    pretty: !isProduction,
    options: {
      cacheDir,
      data: JSON.parse(readFileSync(metadataFile, { encoding: 'utf8' })),
    },
  },
  metadataProvider: TsMorphMetadataProvider,
}

export default defineConfig({
  strict: true,
  validate: true,
  debug: !isProduction,
  dbName: env.DB_NAME.value,
  name: env.DB_NAME.value,
  host: env.DB_HOST.value,
  port: env.DB_PORT.value,
  user: env.DB_USER.value,
  password: env.DB_PASSWORD.value,
  entities: [`${srcBuildDir}/**/*.entity.js`],
  entitiesTs: [`${srcDir}/**/*.entity.ts`],
  migrations: {
    tableName: MIGRATIONS_TABLE_NAME,
    path: join(dbBuildDir, 'migrations'),
    pathTs: join(dbDir, 'migrations'),
    fileName: migrationsFileName,
    snapshotName: MIGRATIONS_SNAPSHOT_NAME,
  },
  seeder: {
    path: join(dbBuildDir, 'seeders'),
    pathTs: join(dbDir, 'seeders'),
    fileName: seederFileName,
  },
  extensions: [SeedManager],
  highlighter: new SqlHighlighter(),
  ...metadataOptions,
})
