import { configFastify } from '@repo/eslint-config'

const IIFE_SCRIPTS = ['src/server.ts']
const AUTOGEN_SCRIPTS = ['src/db/migrations/*.ts']
const HOOKS = ['src/**/*.hook.ts']

/**
 * @type {import('eslint').Linter.Config[]}
 */
export default [
  ...configFastify({
    imports: {
      external: ['@mikro-orm'],
      restricted: [{
        group: ['@/modules'],
        message: 'Use #module-name/* instead.',
      }]
    },
  }),
  {
    files: IIFE_SCRIPTS,
    rules: {
      'import/newline-after-import': 0,
      'prettier/prettier': 0,
    },
  },
  {
    files: AUTOGEN_SCRIPTS,
    rules: {
      '@stylistic/max-len': 0,
    },
  },
  {
    files: HOOKS,
    rules: {
      'func-style': [2, 'declaration', { ovverides: { namedExports: 'ignore' } }],
    },
  },
]
