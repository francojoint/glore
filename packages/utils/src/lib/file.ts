import { resolve } from 'node:path'

import { isProduction } from './env'

/**
 * Resolves a path to a file with the appropriate extension.
 */
export const resolveExt = (...args: string[]) => {
  const ext = isProduction ? '.js' : ''
  return resolve(...args) + ext
}
