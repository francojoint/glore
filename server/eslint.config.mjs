import { resolve } from 'path'
import { cwd } from 'process'

import configBase, { noRestrictedImports, sortImports } from '../eslint.config.mjs'

export const NAMED_IMPORTS = []
export const SORT_IMPORTS = {
  external: ['fastify', 'fastify-plugin', '@fastify'],
  internal: [],
}

/**
 * @type {import('eslint').Linter.Config}
 */
export default [
  ...configBase,
  {
    rules: {
      'no-restricted-imports': [2, noRestrictedImports(NAMED_IMPORTS)],
      'perfectionist/sort-imports': [2, sortImports(SORT_IMPORTS)],
    },
  },
  {
    files: ['**/*config.?(m)[jt]s'],
    rules: {
      'no-restricted-imports': 0,
    },
  },
  {
    files: ['**/*.ts'],
    languageOptions: {
      parserOptions: {
        project: resolve(cwd(), 'tsconfig.json'),
      },
    },
  },
]
