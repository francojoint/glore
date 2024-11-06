import { type FastifyPluginCallback, type FastifyPluginOptions } from 'fastify'
import fp, { type PluginMetadata } from 'fastify-plugin'

/**
 * Plugin options.
 */
export interface PluginOptions extends FastifyPluginOptions {}

/**
 * Plugin callback function.
 */
export interface PluginCallback<Options extends PluginOptions> extends FastifyPluginCallback<Options> {}

/**
 * Wrapper of the `fastifyPlugin` function requiring a generic type for the plugin options.
 *
 * The function does three things:
 * 1. Add the skip-override hidden property
 * 2. Check bare-minimum version of Fastify
 * 3. Pass some custom metadata of the plugin to Fastify
 *
 * @param callback - Fastify plugin function
 * @param metadata - Optional plugin metadata
 *
 * @see {@link https://github.com/fastify/fastify-plugin}
 */
const plugin = <Options extends PluginOptions>(callback: PluginCallback<Options>, metadata: PluginMetadata) =>
  fp(callback, metadata)

export default plugin
