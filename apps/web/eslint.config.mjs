import tailwind from 'eslint-plugin-tailwindcss'

import { configNextjs } from '@repo/eslint-config'

/**
 * @type {import('eslint').Linter.Config[]}
 */
export default [
  ...configNextjs({
    imports: {
      internal: ['@'],
    },
  }),
  ...tailwind.configs['flat/recommended'],
]
