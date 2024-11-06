import { type EventArgs } from '@mikro-orm/core'
import { type FastifyReply } from 'fastify'

import { type BaseEntity } from '@/db/entities'
import { hash, verify } from 'argon2'

import type { HttpCodes } from './.private/types'

/**
 * Base class adding a status code to the error.
 */
export class AppError extends Error {
  code: HttpCodes

  constructor(message: string, code: HttpCodes) {
    super(message)
    this.name = 'AppError'
    this.code = code
  }
}

/**
 * Error class for client errors.
 */
export class ClientError extends Error {
  code: HttpCodes

  constructor(message: string, code: HttpCodes = 400) {
    super(message)
    this.name = 'ClientError'
    this.code = code
  }
}

/**
 * Custom error class for authentication errors.
 */
export class AuthError extends ClientError {
  constructor(message: string) {
    super(message, 401)
    this.name = 'AuthError'
  }
}

/**
 * Sends a 400 error response with the given error message.
 */
export const clientError = <T extends FastifyReply, U extends Error>(reply: T, error?: U, code?: HttpCodes) => {
  if (error) reply.log.error(error)
  if (!error) error = new Error('Client Error') as U
  if (!code) code = error instanceof AuthError ? 401 : 400

  reply.status(code).send({
    statusCode: code,
    message: error.message,
    error: error.name,
  })

  return error
}

/**
 * Hashes the password before saving it to the database.
 */
export const hashPassword = async <T extends BaseEntity>(args: EventArgs<T>) => {
  const password = args.changeSet?.payload.password
  if (password) return await hash(password)
}

/**
 * Verifies the password before logging in.
 */
export const verifyPassword = async (password: string) => {
  const hashed = await hash(password)
  return verify(hashed, password)
}
