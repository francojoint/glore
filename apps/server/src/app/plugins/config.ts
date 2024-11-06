import { name, version } from '@/lib/package'
import plugin from '@/lib/plugin'

declare module 'fastify' {
  export interface FastifyInstance {
    /**
     * Application configuration.
     */
    config: FastifyConfigOptions
  }
}

/**
 * Options for the `config` plugin.
 */
export type FastifyConfigOptions = typeof autoConfig

export const autoConfig = {
  name,
  version,
}

/**
 * Fastify plugin exposing the application configuration.
 */
export default plugin<FastifyConfigOptions>(
  async (fastify, options) => {
    await fastify.decorate('config', options)
  },
  { name: 'config' },
)
