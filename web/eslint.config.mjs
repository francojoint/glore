import { resolve } from 'path'
import { cwd } from 'process'

import tailwind from 'eslint-plugin-tailwindcss'

import configBase, { noRestrictedImports, sortImports } from '../eslint.config.mjs'

const NAMED_IMPORTS = ['react', 'react-dom']
const CUSTOM_GROUPS = {
  react: ['react', 'react/**/*', 'react-*', 'react-*/**/*'],
  next: ['next', 'next/**/*'],
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
      'perfectionist/sort-imports': [2, sortImports(CUSTOM_GROUPS)],
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
