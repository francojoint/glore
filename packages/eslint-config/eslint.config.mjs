import config from './src/index.mjs'

/**
 * @type {import('eslint').Linter.Config[]}
 */
export default [
  ...config(),
  {
    rules: {
      'no-restricted-imports': 0,
      'import/no-useless-path-segments': 0,
    },
  },
]
