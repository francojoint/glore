import { readdirSync } from 'node:fs'
import { RuleConfigSeverity, type UserConfig } from '@commitlint/types'
import { workspaces } from './package.json'

const scopes = workspaces
  .map(workspace =>
    readdirSync(workspace.replace('/*', ''), { withFileTypes: true })
      .filter(dir => dir.isDirectory())
      .map(dir => dir.name),
  )
  .flat()
  .sort()

export default {
  defaultIgnores: true,
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [RuleConfigSeverity.Error, 'always', scopes],
  },
} satisfies UserConfig
