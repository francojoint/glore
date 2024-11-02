import { resolve } from 'path'
import { cwd } from 'process'

import tailwind from 'eslint-plugin-tailwindcss'

import configBase, { noRestrictedImports, sortImports } from '../eslint.config.mjs'

const NAMED_IMPORTS = ['react', 'react-dom']
export const SORT_IMPORTS = {
  external: ['react', 'react-*', 'next'],
  internal: [],
}

/**
 * @type {import('eslint').Linter.Config}
 */
export default [
  ...configBase,
  ...tailwind.configs['flat/recommended'],
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
