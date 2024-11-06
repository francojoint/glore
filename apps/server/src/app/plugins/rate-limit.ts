import rateLimit, { type FastifyRateLimitOptions } from '@fastify/rate-limit'

import plugin, { type PluginCallback } from '@/lib/plugin'

export const autoConfig: PluginCallback<FastifyRateLimitOptions> = fastify => ({
  max: fastify.env.RATE_LIMIT_MAX,
  timeWindow: fastify.env.RATE_LIMIT_TIMEOUT,
})

/**
 * Fastify plugin to manage request rate limiting.
 *
 * @see {@link https://github.com/fastify/fastify-rate-limit}
 */
export default plugin(rateLimit, {
  name: 'rateLimit',
  dependencies: ['env'],
})
