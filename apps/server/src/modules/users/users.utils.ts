import { type FastifyReply, type FastifyRequest } from 'fastify'

import { AuthError, clientError } from '@/modules/app'

import { type User } from '@/db/entities'

/**
 * Extracts the user from the request object.
 */
export const getUserFromToken = <T extends FastifyRequest, U extends FastifyReply>(request: T, reply: U): User => {
  if (!request.user) {
    const err = new AuthError('Please provide a valid token via Authorization header')
    throw clientError(reply, err)
  }
  return request.user as User
}
