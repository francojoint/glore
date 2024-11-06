import { wrap } from '@mikro-orm/core'

import { Cast } from '@lib/schema'
import type { App } from '.private/types'

import { UserDto, type StaticUser } from './users.dto'
import { getUserFromToken } from './users.utils'

export default async (app: App) => {
  app.get(
    '/me',
    {
      schema: {
        response: {
          200: UserDto,
        },
      },
    },
    async (request, reply) => {
      const user = getUserFromToken(request, reply)
      return Cast(UserDto, user)
    },
  )

  app.patch(
    '/me',
    {
      schema: {
        body: UserDto,
        response: {
          200: UserDto,
        },
      },
    },
    async (request, reply) => {
      const user = getUserFromToken(request, reply)
      wrap(user).assign(request.body as StaticUser)
      await app.db.em.flush()
      return Cast(UserDto, user)
    },
  )
}
