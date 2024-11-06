import { RequestContext } from '@mikro-orm/core'
import type { FastifyInstance, FastifyRequest } from 'fastify'

/**
 * Create a request context.
 */
export const createRequestContext = async function (this: FastifyInstance) {
  await RequestContext.create(this.db.em, () => {})
}

/**
 * Verify the JWT token and attach the user to the request.
 */
export const attachUser = async function (this: FastifyInstance, request: FastifyRequest) {
  try {
    const ret = await request.jwtVerify<{ id: number }>()
    request.user = await this.db.user.findOneOrFail(ret.id)
  } catch (e) {
    this.log.error(e)
  }
}
