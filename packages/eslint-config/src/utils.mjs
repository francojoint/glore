import { builtinModules } from 'node:module'

import deepMerge from 'deepmerge'

/**
 * Custom config options.
 *
 * @typedef {{
 *  include?: string[]
 *  imports?: {
 *    named?: string[]
 *    restricted?: string[] | { group: string[], message?: string }[]
 *    external?: string[]
 *    internal?: string[]
 *    allowRelative?: 'ignore' | 'siblings' | 'never'
 *    newlinesBetweenExternals: boolean
 *    newlinesBetweenInternals: boolean
 *    useNodePrefix?: 'ignore' | 'always' | 'never'
 *    noRestrictedImportsOptions?: Record<string, any>
 *    sortImportsOptions?: Record<string, any>
 *  }
 * }} ConfigOptions
 */

/**
 * @type {ConfigOptions}
 * @constant
 */
export const DEFAULT_CONFIG_OPTIONS = {
  include: [],
  imports: {
    named: [],
    restricted: [],
    external: [],
    internal: [],
    allowRelative: 'ignore',
    newlinesBetweenExternals: false,
    newlinesBetweenInternals: false,
    useNodePrefix: 'ignore',
    noRestrictedImportsOptions: {},
    sortImportsOptions: {
      tsconfigRootDir: '.',
    },
  },
}

/**
 * Builds import options for the `no-restricted-imports` rule using custom imports.
 *
 * @param {ConfigOptions['imports']} imports - Custom imports.
 * @param options - `no-restricted-imports` rule options.
 *
 * @see {@link https://eslint.org/docs/rules/no-restricted-imports}
 */
export const noRestrictedImports = (imports = {}) => {
  const { allowRelative, named, noRestrictedImportsOptions, restricted, useNodePrefix } = deepMerge(
    DEFAULT_CONFIG_OPTIONS.imports,
    imports,
  )

  const rule = {
    paths: named.map(name => ({
      name,
      importNames: ['default'],
      message: 'Use named imports instead',
    })),
    patterns: [],
  }

  if (allowRelative === 'never')
    rule.patterns.push({
      group: ['./**/*', '../**/*'],
      message: 'Relative imports are not allowed, use path aliases instead.',
    })
  if (allowRelative === 'siblings')
    rule.patterns.push({
      group: ['../**/*'],
      message: 'Parent imports are not allowed, use path aliases instead.',
    })

  if (restricted.length)
    rule.patterns.push(
      ...restricted.map(pattern =>
        typeof pattern === 'string'
          ? {
              group: [pattern],
            }
          : pattern,
      ),
    )

  if (useNodePrefix === 'never')
    rule.patterns.push({
      group: ['node:*', 'node:*/**/*'],
      message: `Do not use the 'node:' prefix for built-in modules.`,
    })
  if (useNodePrefix === 'always')
    rule.patterns.push({
      group: builtinModules.map(name => [name, `${name}/**/*`]).flat(),
      message: `Use the 'node:' prefix for built-in modules.`,
    })

  return deepMerge(rule, noRestrictedImportsOptions)
}

/**
 * Builds the options for the `sort-imports` rule using custom imports.
 *
 * @param {ConfigOptions['imports']} imports - Custom imports.
 * @param options - `sort-imports` rule options.
 *
 * @see {@link https://perfectionist.dev/rules/sort-imports}
 */
export const sortImports = (imports = {}) => {
  const {
    external = [],
    internal = [],
    newlinesBetweenExternals,
    newlinesBetweenInternals,
    sortImportsOptions,
  } = deepMerge(DEFAULT_CONFIG_OPTIONS.imports, imports)

  const customGroups = [...external, ...internal].reduce((groups, name) => {
    const regexName = name.replace('*', '.*')
    const patterns = [new RegExp(`^${regexName}$`), new RegExp(`^${regexName}/.*`)]

    return {
      value: {
        ...groups.value,
        [name]: patterns,
      },
      type: {
        ...groups.type,
        [name]: patterns,
      },
    }
  }, {})

  const externalGroup = newlinesBetweenExternals ? [external, 'external'] : [['external', ...external]]
  const internalGroup = newlinesBetweenInternals ? [internal, 'internal'] : [['internal', ...internal]]

  return deepMerge(
    {
      groups: [
        ['side-effect', 'side-effect-style'],
        'builtin',
        ...externalGroup,
        ...internalGroup,
        ['parent', 'index', 'sibling'],
      ],
      customGroups,
    },
    sortImportsOptions,
  )
}

/**
 * Filters out rules with configurations.
 *
 * @param {import('eslint').Linter.Config['rules']} rules - ESLint rules.
 */
export const flattenRules = (rules = {}) =>
  Object.keys(rules).reduce((output, name) => {
    const rule = rules[name]
    if (Array.isArray(rule)) return output
    return { ...output, [name]: rule }
  }, {})

/**
 * Adds custom ignores to the configuration.
 *
 * @param {import('eslint').Linter.Config[]} config - ESLint configuration array.
 * @param {string[]} ignores - Custom ignores to add.
 * @return {import('eslint').Linter.Config[]} Modified ESLint configuration.
 */
export const withIgnores = (config, ignores = []) =>
  config.map(cfg => ({
    ...cfg,
    ignores: [...new Set([...(cfg.ignores || []), ...ignores])],
  }))

/**
 * Includes additional files in the configuration.
 *
 * @param {import('eslint').Linter.Config[]} config - ESLint configuration array.
 * @param {string[]} files - Additional files to include.
 * @param {string[]} names - Names of the configurations to include the files.
 * @return {import('eslint').Linter.Config[]} Modified ESLint configuration.
 */
export const withFiles = (config, files = [], names = []) => {
  if (!files.length) return config

  return config.map(cgf => {
    if (!names.includes(cgf.name)) return cgf
    return { ...cgf, files: [...new Set([...(cgf.files || ['**/*']), ...files])] }
  })
}
