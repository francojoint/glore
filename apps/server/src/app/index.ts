import fastifyAutoload from '@fastify/autoload'
import { TypeBoxValidatorCompiler, type TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import Fastify from 'fastify'

import { deepMerge } from '@repo/utils'

import defaultConfig, { type AppConfig } from './config'

// export interface App extends Awaited<ReturnType<typeof app>> {}

/**
 * Creates a new application instance with the given configuration.
 */
const app = async (config?: AppConfig) => {
  /* Merge default and custom config */
  const options = deepMerge(defaultConfig, config || {})

  /* Set validator compiler */
  const fastify = Fastify(options.server).setValidatorCompiler(TypeBoxValidatorCompiler)
  const app = fastify.withTypeProvider<TypeBoxTypeProvider>()

  /* Register plugins and modules */
  app.register(fastifyAutoload, options.plugins)
  app.register(fastifyAutoload, options.modules)

  return app
}

export default app
