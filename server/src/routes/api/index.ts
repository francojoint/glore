import { type FastifyInstance } from 'fastify'

export default async (fastify: FastifyInstance) => {
  fastify.get('/', ({ user, protocol, hostname }) => ({
    message: `Hello ${user.username}! See documentation at ${protocol}://${hostname}/documentation`,
  }))
}
