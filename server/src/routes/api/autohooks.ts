import { type FastifyInstance } from 'fastify'

export default async (fastify: FastifyInstance) => {
  fastify.addHook('onRequest', async request => {
    if (!request.url.startsWith('/api/auth/login')) {
      await request.jwtVerify()
    }
  })
}
