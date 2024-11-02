import { RuleConfigSeverity, type UserConfig } from '@commitlint/types'

export default {
  defaultIgnores: true,
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [RuleConfigSeverity.Error, 'always', ['server', 'web']],
  },
} satisfies UserConfig
