/** External modules */
export { default as pluralize } from 'pluralize'

/**
 * Converts a string to `camelCase`.
 */
export const toCamelCase = (input: string) =>
  input.replace(/([-_][a-z])/gi, $1 => $1.toUpperCase().replace('-', '').replace('_', ''))

/**
 * Converts a string to `kebab-case`.
 */
export const toKebabCase = (input: string) => input.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()

/**
 * Converts a string to `snake_case`.
 */
export const toSnakeCase = (input: string) => input.replace(/([a-z0-9])([A-Z])/g, '$1_$2').toLowerCase()

/**
 * Turns any string into a slug.
 */
export const toSlug = (input: string) =>
  input
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-')
