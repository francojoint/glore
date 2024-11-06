import { join } from 'node:path'

import { type AutoloadPluginOptions } from '@fastify/autoload'
import { type FastifyServerOptions } from 'fastify'

import { packageRoot } from '@repo/utils'

export interface AppConfig
  extends Partial<{
    plugins: AutoloadPluginOptions
    modules: AutoloadPluginOptions
    server: FastifyServerOptions
  }> {}

export default {
  plugins: {
    dir: join(__dirname, 'plugins'),
  },
  modules: {
    dir: packageRoot('src/modules'),
    matchFilter: /^.+\.module\.ts$/,
    autoHooks: true,
    autoHooksPattern: /^.+\.hooks\.ts$/,
    cascadeHooks: true,
  },
  server: {
    ajv: {
      customOptions: {
        coerceTypes: 'array',
        removeAdditional: 'all',
      },
    },
    logger: process.stdout.isTTY
      ? {
          level: 'info',
          transport: {
            target: 'pino-pretty',
            options: {
              translateTime: 'HH:MM:ss Z',
              ignore: 'pid',
            },
          },
        }
      : { level: process.env.LOG_LEVEL ?? 'silent' },
  },
} satisfies AppConfig
