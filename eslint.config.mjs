import stylistic from '@stylistic/eslint-plugin'
import gitignore from 'eslint-config-flat-gitignore'
import importPlugin from 'eslint-plugin-import'
import perfectionist from 'eslint-plugin-perfectionist'
import preferArrow from 'eslint-plugin-prefer-arrow'
import unusedImports from 'eslint-plugin-unused-imports'
import typescript from 'typescript-eslint'

/**
 * @type {import('eslint').Linter.Config}
 */
export default [
  gitignore(),
  ...typescript.configs.recommended,
  {
    plugins: {
      '@stylistic': stylistic,
      perfectionist,
      import: importPlugin,
      'prefer-arrow': preferArrow,
      'unused-imports': unusedImports,
    },
    settings: {
      'import/internal-regex': '^@/',
    },
    rules: {
      'arrow-body-style': [2, 'as-needed'],
      'comma-dangle': [2, 'always-multiline'],
      'func-style': [2, 'expression'],
      'max-lines': 2,
      'no-console': [1, { allow: ['error', 'warn'] }],
      'no-duplicate-imports': [2, { includeExports: true }],
      'no-restricted-imports': [
        2, {
          patterns: [
            {
              group: ['../*'],
              message: 'Usage of relative parent imports is not allowed.',
            },
          ],
        },
      ],
      'no-unused-vars': [
        2, {
          argsIgnorePattern: '^_',
        },
      ],
      'no-var': 2,
      'object-shorthand': [2, 'always'],
      'prefer-arrow-callback': [
        2, {
          allowNamedFunctions: true,
        },
      ],
      'prefer-const': [
        2, {
          destructuring: 'any',
          ignoreReadBeforeAssign: false,
        },
      ],
      'sort-keys': 0,
      'sort-vars': [
        1, {
          ignoreCase: false,
        },
      ],

      '@stylistic/array-bracket-newline': [2, 'consistent'],
      '@stylistic/array-bracket-spacing': [2, 'never'],
      '@stylistic/array-element-newline': [2, 'consistent'],
      '@stylistic/eol-last': 2,
      '@stylistic/jsx-curly-brace-presence': [
        2, {
          props: 'never',
          children: 'always',
          propElementValues: 'always',
        },
      ],
      '@stylistic/max-len': [
        2, {
          code: 140,
          ignoreUrls: true,
        },
      ],
      '@stylistic/no-extra-semi': 2,
      '@stylistic/no-multiple-empty-lines': [
        2, {
          max: 1,
        },
      ],
      '@stylistic/no-trailing-spaces': 2,
      '@stylistic/object-curly-spacing': [2, 'always'],
      '@stylistic/jsx-one-expression-per-line': [
        2, {
          allow: 'single-child',
        },
      ],
      '@stylistic/quote-props': [2, 'as-needed'],
      '@stylistic/quotes': [2, 'single'],
      '@stylistic/semi': [2, 'never'],

      'import/first': 2,
      'import/newline-after-import': [
        2, {
          exactCount: true,
          considerComments: true,
        },
      ],
      'import/no-absolute-path': 2,
      'import/no-amd': 2,
      'import/no-commonjs': 2,
      'import/no-deprecated': 2,
      'import/no-duplicates': [
        2, {
          'prefer-inline': true,
        },
      ],
      'import/no-empty-named-blocks': 2,
      'import/no-extraneous-dependencies': 2,
      'import/no-mutable-exports': 2,
      'import/no-self-import': 2,
      'import/no-unused-modules': [
        2, {
          missingExports: true,
        },
      ],
      'import/no-useless-path-segments': [
        2, {
          noUselessIndex: true,
        },
      ],

      'perfectionist/sort-imports': [
        2, {
          groups: [
            ['side-effect', 'side-effect-style'],
            'builtin',
            'external',
            ['internal', 'parent', 'sibling', 'index'],
            'style',
            'object',
            'unknown',
          ],
          newlinesBetween: 'always',
          internalPattern: ['@/**'],
        },
      ],
      'perfectionist/sort-named-imports': [
        2, {
          type: 'alphabetical',
          groupKind: 'values-first',
        },
      ],

      'prefer-arrow/prefer-arrow-functions': [
        1, {
          allowStandaloneDeclarations: false,
          classPropertiesAllowed: false,
          disallowPrototype: true,
          singleReturnOnly: false,
        },
      ],

      'unused-imports/no-unused-imports': 2,
    },
  },
  {
    files: ['**/*.config.?(m)[jt]s'],
    rules: {
      'import/no-anonymous-default-export': 0,
      'no-restricted-imports': 0,
    },
  },
  {
    files: ['**/*.ts?(x)'],
    languageOptions: {
      ecmaVersion: 5,
      sourceType: 'script',
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    settings: {
      'import/resolver': {
        typescript: true,
      },
    },
    rules: {
      '@typescript-eslint/consistent-type-imports': [
        2, {
          prefer: 'type-imports',
          fixStyle: 'inline-type-imports',
          disallowTypeAnnotations: false,
        },
      ],
      '@typescript-eslint/no-explicit-any': 0,
      '@typescript-eslint/no-namespace': 0,
      '@typescript-eslint/no-unused-vars': [
        2, {
          argsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-useless-empty-export': 2,
      '@typescript-eslint/prefer-for-of': 2,
      '@typescript-eslint/prefer-string-starts-ends-with': 2,
    },
  },
]
