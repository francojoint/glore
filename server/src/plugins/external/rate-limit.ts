import fastifyRateLimit from '@fastify/rate-limit'
import { type FastifyInstance } from 'fastify'

export const autoConfig = (fastify: FastifyInstance) => ({
  max: fastify.config.RATE_LIMIT_MAX,
  timeWindow: '1 minute',
})

/**
 * This plugins is low overhead rate limiter for your routes.
 *
 * @see {@link https://github.com/fastify/fastify-helmet}
 */
export default fastifyRateLimit
