/**
 * Merges multiple top-level objects or arrays into one.
 */
export const merge = <T extends Record<any, any> | any[]>(...args: T[]): T =>
  (Array.isArray(args[0])
    ? [...new Set(...args.flat())]
    : args.reduce((result, obj) => Object.assign(result, obj), {})) as T

/**
 * Plucks keys from an object.
 */
export const pluck = <T, K extends keyof T>(objs: T, ...keys: K[]): Pick<T, K> =>
  keys.reduce((result, key) => Object.assign(result, { [key as string]: objs[key] }), {}) as Pick<T, K>

/**
 * Plucks keys from nested objects.
 */
export const pluckObj = <T extends Record<string, any>, K extends keyof T>(
  obj: Record<string, T>,
  ...keys: K[]
): Record<string, Pick<T, K>> =>
  Object.keys(obj).reduce(
    (result, key) => ({
      ...result,
      [key]: pluck(obj[key], ...keys),
    }),
    {},
  )

/**
 * Plucks keys from nested objects without identifying the keys.
 */
export const pluckAnyObj = <T extends Record<string, any>, K extends string>(
  obj: Record<string, T>,
  ...keys: K[]
): Record<string, Pick<T, K[number]>> =>
  Object.keys(obj).reduce(
    (result, key) => ({
      ...result,
      [key]: pluck(obj[key], ...keys),
    }),
    {},
  )

/* --------- Strings -------- */

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
