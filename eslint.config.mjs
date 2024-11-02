import stylistic from '@stylistic/eslint-plugin'
import stylisticTs from '@stylistic/eslint-plugin-ts'
import gitignore from 'eslint-config-flat-gitignore'
import importPlugin from 'eslint-plugin-import'
import perfectionist from 'eslint-plugin-perfectionist'
import preferArrow from 'eslint-plugin-prefer-arrow'
import prettier from 'eslint-plugin-prettier'
import unusedImports from 'eslint-plugin-unused-imports'
import typescript from 'typescript-eslint'

export const NAMED_IMPORTS = ['path']
export const SORT_IMPORTS = {
  external: [],
  internal: ['@shared'],
}

/**
 * @param {string[]} [imports={}] - Modules to use as named imports.
 * @param {boolean} [allowRelativeParents=false] - Allow relative parent imports.
 */
export const noRestrictedImports = (imports = [], allowRelativeParents = false) => ({
  paths: [...NAMED_IMPORTS, ...imports].map(name => ({
    name,
    importNames: ['default'],
    message: 'Use named imports instead',
  })),
  ...(!allowRelativeParents && {
    patterns: [
      {
        group: ['../*'],
        message: 'Use path aliases instead.',
      },
    ],
  }),
})

/**
 * @param {{
 *   internal?: string[]
 *   external?: string[]
 * }} [imports={}] - Modules for internal and external imports.
 */
export const sortImports = (imports = {}) => {
  const externals = [...SORT_IMPORTS.external, ...(imports.external || [])]
  const internals = [...SORT_IMPORTS.internal, ...(imports.internal || [])]
  const customGroups = [...externals, ...internals].reduce(
    (groups, name) => ({
      value: {
        ...groups.value,
        [name]: [name, `${name}/**/*`],
      },
      type: {
        ...groups.type,
        [name]: [name, `${name}/**/*`],
      },
    }),
    {},
  )

  return {
    internalPattern: ['@/**'],
    newlinesBetween: 'ignore',
    groups: [
      'side-effect',
      'side-effect-style',
      'builtin',
      ...externals,
      'external',
      ...internals,
      'internal',
      'parent',
      'sibling',
      'index',
    ],
    customGroups,
  }
}

/**
 * @type {import('eslint').Linter.Config[]}
 */
export default [
  gitignore(),
  {
    name: 'base',
    plugins: {
      '@stylistic': stylistic,
      '@stylistic/ts': stylisticTs,
      perfectionist,
      import: importPlugin,
      'prefer-arrow': preferArrow,
      prettier,
      'unused-imports': unusedImports,
    },
    settings: {
      'import/internal-regex': '^@/',
    },
    rules: {
      'arrow-body-style': [2, 'as-needed'],
      'comma-dangle': [2, 'always-multiline'],
      eqeqeq: [2, 'always'],
      'func-style': [2, 'expression'],
      'max-lines': 2,
      'no-console': [1, { allow: ['error', 'warn'] }],
      'no-duplicate-imports': [2, { includeExports: true }],
      'no-restricted-imports': [2, noRestrictedImports()],
      'no-unused-vars': [
        2,
        {
          argsIgnorePattern: '^_',
        },
      ],
      'no-var': 2,
      'object-shorthand': [2, 'always'],
      'prefer-arrow-callback': [
        2,
        {
          allowNamedFunctions: true,
        },
      ],
      'prefer-const': [
        2,
        {
          destructuring: 'any',
          ignoreReadBeforeAssign: false,
        },
      ],
      'prefer-template': 2,
      'sort-keys': 0,
      'sort-vars': [
        1,
        {
          ignoreCase: false,
        },
      ],

      '@stylistic/array-bracket-newline': [2, 'consistent'],
      '@stylistic/array-bracket-spacing': [2, 'never'],
      '@stylistic/array-element-newline': [2, 'consistent'],
      '@stylistic/eol-last': 2,
      '@stylistic/jsx-curly-brace-presence': [
        2,
        {
          props: 'never',
          children: 'always',
          propElementValues: 'always',
        },
      ],
      '@stylistic/max-len': [
        2,
        {
          code: 140,
          ignoreUrls: true,
        },
      ],
      '@stylistic/no-extra-semi': 2,
      '@stylistic/no-multiple-empty-lines': [
        2,
        {
          max: 1,
        },
      ],
      '@stylistic/no-trailing-spaces': 2,
      '@stylistic/object-curly-spacing': [2, 'always'],
      '@stylistic/template-curly-spacing': [2, 'never'],

      'import/first': 2,
      'import/newline-after-import': [
        2,
        {
          exactCount: true,
          considerComments: true,
        },
      ],
      'import/no-absolute-path': 2,
      'import/no-amd': 2,
      'import/no-commonjs': 2,
      'import/no-deprecated': 2,
      'import/no-duplicates': [
        2,
        {
          'prefer-inline': true,
        },
      ],
      'import/no-empty-named-blocks': 2,
      'import/no-mutable-exports': 2,
      'import/no-self-import': 2,
      'import/no-useless-path-segments': [
        2,
        {
          noUselessIndex: true,
        },
      ],

      'perfectionist/sort-exports': 2,
      'perfectionist/sort-imports': [2, sortImports()],
      'perfectionist/sort-named-imports': [
        2,
        {
          type: 'alphabetical',
          groupKind: 'values-first',
        },
      ],

      'prefer-arrow/prefer-arrow-functions': [
        2,
        {
          allowStandaloneDeclarations: false,
          classPropertiesAllowed: false,
          disallowPrototype: true,
          singleReturnOnly: false,
        },
      ],

      'prettier/prettier': [2, {}, { usePrettierrc: true }],

      'unused-imports/no-unused-imports': 2,
    },
  },
  {
    name: 'config',
    files: ['**/*config.?(m)[jt]s'],
    rules: {
      'no-restricted-imports': 0,
      '@stylistic/array-element-newline': 0,
      '@stylistic/max-len': 0,
      'import/no-anonymous-default-export': 0,
    },
  },
  ...typescript.configs.recommended,
  {
    name: 'typescript',
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
      'no-unused-vars': 0,
      '@stylistic/ts/member-delimiter-style': [
        2,
        {
          multiline: {
            delimiter: 'none',
            requireLast: false,
          },
        },
      ],
      '@typescript-eslint/consistent-type-imports': [
        2,
        {
          prefer: 'type-imports',
          fixStyle: 'inline-type-imports',
          disallowTypeAnnotations: false,
        },
      ],
      '@typescript-eslint/no-empty-object-type': [
        2,
        {
          allowInterfaces: 'always',
        },
      ],
      '@typescript-eslint/no-explicit-any': 0,
      '@typescript-eslint/no-namespace': 0,
      '@typescript-eslint/no-unused-vars': [
        2,
        {
          argsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-useless-empty-export': 2,
      '@typescript-eslint/prefer-for-of': 2,
      '@typescript-eslint/prefer-string-starts-ends-with': 2,
    },
  },
  {
    name: 'types',
    files: ['**/*.d.ts', '**/types.ts'],
    rules: {
      'max-lines': 0,
    },
  },
]
