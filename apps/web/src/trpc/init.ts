import { cache } from 'react'

import { initTRPC } from '@trpc/server'

export const createTRPCContext = cache(async () =>
  /**
   * @see: https://trpc.io/docs/server/context
   */
  ({ userId: 'user_123' }),
)

const t = initTRPC.create({
  /**
   * @see https://trpc.io/docs/server/data-transformers
   */
  // transformer: superjson,
})
// Base router and procedure helpers
export const createTRPCRouter = t.router
export const createCallerFactory = t.createCallerFactory
export const baseProcedure = t.procedure
