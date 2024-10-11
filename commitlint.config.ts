import type { AnyRuleConfig, AsyncRule, Rule, RuleConfigQuality, SyncRule, UserConfig } from '@commitlint/types'

/**
 * Ignore rule to skip Dependabot commits
 */
const ignoreDependabot = (commit: string): boolean => /build\(deps(-dev)?\)/.test(commit)

/**
 * Custom commitlint rules.
 */
export type CustomRules = Record<string, { config: AnyRuleConfig<RuleConfigQuality.User>, plugin: AsyncRule | Rule | SyncRule }>

const customRules: CustomRules = {}

const customRulesPlugin = { rules: Object.keys(customRules).reduce((a, k) => ({ ...a, [k]: customRules[k].plugin }), {}) }
const customRulesConfig = Object.keys(customRules).reduce((a, k) => ({ ...a, [k]: customRules[k].config }), {})

const commitlintConfig: UserConfig = {
  defaultIgnores: true,
  extends: ['@commitlint/config-conventional'],
  ignores: [ignoreDependabot],
  plugins: [customRulesPlugin],
  rules: customRulesConfig,
}

export default commitlintConfig
