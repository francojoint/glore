import config from '@repo/eslint-config'
import { withIgnores } from '@repo/eslint-config/utils'

/**
 * @type {import('eslint').Linter.Config[]}
 */
export default withIgnores(config(), ['apps', 'packages'])
