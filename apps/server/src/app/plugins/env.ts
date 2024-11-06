import env, { type FastifyEnvOptions } from '@fastify/env'

import { T } from '@/lib/schema'

declare module 'fastify' {
  export interface FastifyInstance {
    /**
     * Application environment variables.
     */
    env: {
      [key in keyof typeof schema.properties]: (typeof schema.properties)[key]['static']
    }
  }
}

const schema = T.Object({
  PORT: T.Number({ default: 3000 }),
  HOST: T.String({ default: 'localhost' }),
  RATE_LIMIT_MAX: T.Number({ default: 100 }),
  RATE_LIMIT_TIMEOUT: T.Number({ default: 500 }),
  CLOSE_DELAY: T.Number({ default: 200 }),
  LOG_LEVEL: T.String({ default: 'info' }),
  DB_NAME: T.String(),
  DB_HOST: T.String(),
  DB_PORT: T.Number({ default: 5432 }),
  DB_USER: T.String(),
  DB_PASSWORD: T.String(),
  JWT_SECRET: T.String(),
})

export const autoConfig: FastifyEnvOptions = {
  confKey: 'env',
  dotenv: true,
  schema,
}

/**
 * Fastify plugin to handle environment variables.
 *
 * @see {@link https://github.com/fastify/fastify-env}
 */
export default env
