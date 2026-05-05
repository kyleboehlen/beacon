export type { RulesConfig } from '@/shared/models/generated/rules-config'
export { RulesConfigStatus } from '@/shared/models/generated/rules-config-status'
export type { RuleOption } from '@/shared/models/generated/rule-option'
export { RuleCategory } from '@/shared/models/generated/rule-category'
export type { RuleRelationship } from '@/shared/models/generated/rule-relationship'
export { RuleRelationType } from '@/shared/models/generated/rule-relation-type'

import type { RulesConfig } from '@/shared/models/generated/rules-config'
import type { RuleOption } from '@/shared/models/generated/rule-option'

// Keys of RulesConfig that are RuleOption fields (excludes id, status, createdAt, updatedAt)
export type RuleKey = {
  [K in keyof RulesConfig]: RulesConfig[K] extends RuleOption<boolean> ? K : never
}[keyof RulesConfig]
