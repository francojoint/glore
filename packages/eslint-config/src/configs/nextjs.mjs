import { deepMerge } from '../utils.mjs'
import configBase from './base.mjs'

/**
 * Custom ESLint configuration for Next.js projects.
 *
 * @param {import('../utils.mjs').ConfigOptions} options - Options for the Next.js configuration.
 * @return {import('eslint').Linter.Config[]}
 */
const configNextjs = (options = {}) => [
  ...configBase(
    deepMerge(
      {
        imports: {
          named: ['react', 'react-dom'],
          external: ['react', 'react-*', 'next'],
        },
      },
      options,
    ),
  ),
]

export default configNextjs
