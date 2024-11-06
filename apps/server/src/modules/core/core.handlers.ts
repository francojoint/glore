import { type FastifyError, type FastifyReply, type FastifyRequest } from 'fastify'

export const errorHandler = (error: FastifyError, request: FastifyRequest, reply: FastifyReply) => {
  request.log.error(
    {
      error,
      request: {
        method: request.method,
        url: request.url,
        query: request.query,
        params: request.params,
      },
    },
    'Unhandled error occurred',
  )

  const code = error.statusCode ?? 500
  const message = code === 401 ? error.message : 'Internal Server Error'

  reply.code(code)

  return { message }
}

export const notFoundHandler = (request: FastifyRequest, reply: FastifyReply) => {
  request.log.warn(
    {
      request: {
        method: request.method,
        url: request.url,
        query: request.query,
        params: request.params,
      },
    },
    'Resource not found',
  )

  reply.code(404)

  return { message: 'Not Found' }
}
