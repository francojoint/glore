import { type FastifyInstance } from 'fastify'

import { MessageDto } from '#core/dto'

export default async (app: FastifyInstance) => {
  app.get(
    '/',
    {
      schema: {
        response: {
          200: MessageDto,
        },
      },
    },
    () => ({
      success: true,
      statusCode: 200,
      message: `Welcome to ${app.config.name} v${app.config.version}`,
    }),
  )
}
