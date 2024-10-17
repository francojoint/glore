import { resolve } from 'path'
import { cwd } from 'process'

import baseConfig from '../eslint.config.mjs'

/**
 * @type {import('eslint').Linter.Config}
 */
export default [
  ...baseConfig,
  {
    rules: {
      'perfectionist/sort-imports': [
        2, {
          groups: [
            ['side-effect', 'side-effect-style'],
            'builtin',
            ['react', 'next'],
            'external',
            ['internal', 'parent', 'sibling', 'index'],
            'style',
            'object',
            'unknown',
          ],
          customGroups: {
            value: {
              react: ['react', 'react/**/*', 'react-*', 'react-*/**/*'],
              next: ['next', 'next/**/*'],
            },
            type: {
              react: ['react', 'react/**/*', 'react-*', 'react-*/**/*'],
              next: ['next', 'next/*'],
            },
          },
          newlinesBetween: 'always',
          internalPattern: ['@/**'],
        },
      ],
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
