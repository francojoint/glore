import cors, { type FastifyCorsOptions } from '@fastify/cors'

export const autoConfig: FastifyCorsOptions = {
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
}

/**
 * Fastify plugin to enable the use of CORS.
 *
 * @see {@link https://github.com/fastify/fastify-cors}
 */
export default cors
