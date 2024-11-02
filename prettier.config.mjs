/**
 * @type {import('prettier').Options}
 */
export default {
  arrowParens: 'avoid',
  printWidth: 140,
  quoteProps: 'as-needed',
  semi: false,
  singleQuote: true,
  trailingComma: 'all',
  overrides: [
    {
      files: ['*.css'],
      options: {
        printWidth: 120,
        singleQuote: false,
      },
    },
    {
      files: ['*.json'],
      options: {
        singleQuote: false,
        trailingComma: 'none',
      },
    },
    {
      files: ['*.yml', '*.yaml'],
      options: {
        singleQuote: false,
      },
    },
    {
      files: ['.github/workflows/*.yml'],
      options: {
        singleQuote: true,
      },
    },
  ],
}
