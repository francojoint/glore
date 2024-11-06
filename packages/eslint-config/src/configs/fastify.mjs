import { deepMerge } from '../utils.mjs'
import configBase from './base.mjs'

/**
 * Custom ESLint configuration for Fastify projects.
 *
 * @param {import('../utils.mjs').ConfigOptions} options - Options for the Fastify configuration.
 * @return {import('eslint').Linter.Config[]}
 */
const configFastify = (options = {}) => [
  ...configBase(
    deepMerge(
      {
        imports: {
          external: ['@fastify', 'fastify', 'fastify-plugin'],
        },
      },
      options,
    ),
  ),
]

export default configFastify
