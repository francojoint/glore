/**
 * @type {import('prettier').Options}
 */
export default {
  overrides: [
    {
      files: ['*.json'],
      options: {
        trailingComma: 'none',
      },
    },
    {
      files: ['*.css'],
      options: {
        printWidth: 120,
        singleQuote: false,
      },
    },
  ],
}

