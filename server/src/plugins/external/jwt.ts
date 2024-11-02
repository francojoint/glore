import fastifyJwt from '@fastify/jwt'
import { type FastifyInstance } from 'fastify'

export const autoConfig = (fastify: FastifyInstance) => ({
  secret: fastify.config.JWT_SECRET,
})

export default fastifyJwt
