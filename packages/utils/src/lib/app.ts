import { accessSync } from 'node:fs'
import { join } from 'node:path'

/**
 * Root directory of the workspace.
 */
export const root = ((): string => {
  let _getRoot: (dir: string) => string

  return (_getRoot = (dir: string) => {
    try {
      accessSync(join(dir, './package.json'))
    } catch {
      if (dir === '/') throw new Error('Could not find root directory')
      return _getRoot(join(dir, '..'))
    }
    return dir
  })(join(__dirname, '../..'))
})()

/**
 * Directory of the current package.
 *
 * @param path - Optional path to append to the package directory.
 */
export const packageRoot = (path?: string): string => {
  let _getPackageDir: (dir: string) => string

  const root = (_getPackageDir = (dir: string) => {
    try {
      accessSync(join(dir, './package.json'))
    } catch {
      if (dir === '/') throw new Error('Could not find package directory')
      return _getPackageDir(join(dir, '..'))
    }
    return dir
  })('..')

  return join(root, path || '')
}
