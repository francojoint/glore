import { type FastifyInstance } from 'fastify'

import closeWithGrace from 'close-with-grace'

import { errorHandler, notFoundHandler } from '#core/handlers'
import { attachUser, createRequestContext } from '#core/hooks'
import coreRouter from '#core/router'

export default async (app: FastifyInstance) => {
  /* Plugins and routes */

  /* Hooks */
  app.addHook('onRequest', createRequestContext)
  app.addHook('onRequest', attachUser)

  const closeListeners = closeWithGrace(
    {
      delay: app.env.CLOSE_DELAY,
    },
    async ({ err }) => {
      if (err) app.log.error(err)
      await app.close()
    },
  )

  app.addHook('onClose', async () => {
    closeListeners.uninstall()
    await app.db.orm.close()
  })

  /* Handlers */
  await app.setNotFoundHandler(
    {
      preHandler: app.rateLimit({
        max: app.env.RATE_LIMIT_MAX,
        timeWindow: app.env.RATE_LIMIT_TIMEOUT,
      }),
    },
    notFoundHandler,
  )
  await app.setErrorHandler(errorHandler)

  app.register(coreRouter)
}
