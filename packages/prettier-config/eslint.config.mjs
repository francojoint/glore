import config from '@repo/eslint-config'

/**
 * @type {import('eslint').Linter.Config[]}
 */
export default [
  ...config(),
  {
    rules: {
      'import/no-useless-path-segments': 0,
    },
  },
]
