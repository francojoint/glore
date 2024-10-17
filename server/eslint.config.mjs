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
      'import/no-unused-modules': 0,
      'no-unused-vars': 0,
      'perfectionist/sort-imports': [
        2, {
          groups: [
            ['side-effect', 'side-effect-style'],
            'builtin',
            ['nest', 'external'],
            ['internal', 'parent', 'sibling', 'index'],
            'style',
            'object',
            'unknown',
          ],
          customGroups: {
            value: {
              nest: ['@nestjs', '@nestjs/**/*'],
            },
            type: {
              nest: ['@nestjs', '@nestjs/**/*'],
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
