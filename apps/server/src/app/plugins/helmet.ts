import helmet, { type FastifyHelmetOptions } from '@fastify/helmet'

export const autoConfig: FastifyHelmetOptions = {}

/**
 * Fastify plugin to set basic security headers.
 *
 * @see {@link https://github.com/fastify/fastify-helmet}
 */
export default helmet
