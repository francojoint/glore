import jwt, { type FastifyJWTOptions } from '@fastify/jwt'

import plugin, { type PluginCallback } from '@/lib/plugin'

export const autoConfig: PluginCallback<FastifyJWTOptions> = fastify => ({
  secret: fastify.env.JWT_SECRET,
})

/**
 * Fastify plugin to enable the usage of JWT.
 *
 * @see {@link https://github.com/fastify/fastify-jwt}
 */
export default plugin(jwt, {
  dependencies: ['env'],
  name: 'jwt',
})
