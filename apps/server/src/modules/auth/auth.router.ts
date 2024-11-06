import { Cast } from '@/lib/schema'
import { AuthError, clientError, ErrorSchema } from '@/modules/common'
import { UserAuthSchema, UserSchema, UserSignupSchema } from '@/modules/user'

import type { App } from '@/lib/types'

export default async (app: App) => {
  app.post(
    '/signup',
    {
      schema: {
        body: UserSignupSchema,
        response: {
          200: UserSchema,
          400: ErrorSchema,
        },
      },
    },
    async (req, reply) => {
      const params = req.body

      if (await app.db.user.exists(params.email)) {
        const err = new AuthError('Email already exists')
        clientError(reply, err)
      }

      const user = app.db.user.create(params)

      await app.db.em.flush()
      user.token = app.jwt.sign({ id: user.id })

      return Cast(UserSchema, user)
    },
  )

  app.post(
    '/login',
    {
      schema: {
        body: UserAuthSchema,
        response: {
          200: UserSchema,
        },
      },
    },
    async (req, reply) => {
      const { email, password } = req.body
      const user = await app.db.user.login(email, password)

      if (!user) {
        const err = new AuthError('Invalid email or password')
        clientError(reply, err)
      }

      user.token = app.jwt.sign({ id: user.id })
      return Cast(UserSchema, user)
    },
  )
}
