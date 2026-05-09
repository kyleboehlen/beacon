import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { RulesConfig, RuleOption } from './types'
import { RuleKey, RulesConfigStatus, RuleCategory, RuleRelationType } from './types'
import { useRulesApi } from '@/entities/rules/api/useRulesApi'
import { camelCaseToProperCaseWithSpaces } from '@/shared/lib/utils/strings'

const UNSUPPORTED_RULES = new Set<RuleKey>([RuleKey.InstantUpgrades])

function isRuleOption(v: unknown): v is RuleOption<boolean> {
  return (
    typeof v === 'object' &&
    v !== null &&
    typeof (v as Record<string, unknown>).key === 'number' &&
    typeof (v as Record<string, unknown>).value === 'boolean'
  )
}

// Extracts all RuleOption<boolean> entries from a RulesConfig, keyed by RuleKey.
const buildRuleMap = (config: RulesConfig): Map<RuleKey, RuleOption<boolean>> => {
  const map = new Map<RuleKey, RuleOption<boolean>>()
  for (const value of Object.values(config)) {
    if (isRuleOption(value))
      map.set(value.key, value)
  }
  return map
}

export const useRulesConfigStore = defineStore('rulesConfig', () => {
  const api = useRulesApi()

  // State
  const rulesConfig = ref<RulesConfig | null>(null)

  // Getters
  const hasRulesConfig = computed(() => rulesConfig.value !== null)
  const rulesConfigId = computed(() => rulesConfig.value?.id ?? null)
  const isLocked = computed(() => rulesConfig.value?.status === RulesConfigStatus.Active)

  const ruleMap = computed(() =>
    rulesConfig.value ? buildRuleMap(rulesConfig.value) : new Map<RuleKey, RuleOption<boolean>>()
  )

  // Actions
  const hydrateDefaults = async () => {
    const response = await api.hydrateRulesConfig()
    if (response === false) throw new Error('Failed to fetch default rules configuration')

    rulesConfig.value = {
      ...response.defaultRulesConfig,
      id: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  }

  const saveRulesConfig = async (): Promise<string> => {
    if (!rulesConfig.value) throw new Error('Cannot save: no rules config loaded')

    const response = await api.createRulesConfig({ rulesConfig: rulesConfig.value })
    if (response === false) throw new Error('Failed to save rules configuration')

    rulesConfig.value = response.rulesConfig
    return response.rulesConfig.id
  }

  const loadRulesConfig = async (id: string) => {
    const response = await api.getRulesConfig(id)
    if (response === false) throw new Error('Failed to load rules configuration')

    rulesConfig.value = response.rulesConfig
  }

  const updateRulesConfig = async () => {
    if (!rulesConfig.value?.id) throw new Error('Cannot update: no rules config with ID loaded')

    const response = await api.updateRulesConfig(rulesConfig.value.id, { rulesConfig: rulesConfig.value })
    if (response === false) throw new Error('Failed to update rules configuration')

    rulesConfig.value = response.rulesConfig
  }

  const deleteRulesConfig = async () => {
    if (!rulesConfig.value?.id) throw new Error('Cannot delete: no rules config with ID loaded')

    const response = await api.deleteRulesConfig(rulesConfig.value.id)
    if (response === false) throw new Error('Failed to delete rules configuration')

    rulesConfig.value = null
  }

  const setRulesConfig = (config: RulesConfig) => {
    rulesConfig.value = config
  }

  const setStatus = (status: RulesConfigStatus) => {
    if (!rulesConfig.value) throw new Error('Cannot set status: no rules config loaded')
    rulesConfig.value.status = status
  }

  // Maps each conflicted RuleKey to the RuleKey that caused the conflict
  const conflicts = computed(() => {
    const conflicted = new Map<RuleKey, RuleKey>()
    if (!rulesConfig.value) return conflicted

    for (const { source, target, type } of rulesConfig.value.ruleRelationships) {
      const sourceRule = ruleMap.value.get(source)
      if (!sourceRule) continue

      if (type === RuleRelationType.Incompatible && sourceRule.value)
        conflicted.set(target, source)

      if (type === RuleRelationType.Requires) {
        const targetRule = ruleMap.value.get(target)
        if (targetRule && !targetRule.value)
          conflicted.set(source, target)
      }
    }

    return conflicted
  })

  // Pre-computed conflict details per RuleKey — used by rulesForCategory for cheap lookup
  const conflictDetails = computed(() => {
    const details = new Map<RuleKey, { message: string; willDisable: RuleKey[] }>()
    if (!rulesConfig.value) return details

    for (const r of rulesConfig.value.ruleRelationships) {
      if (r.type === RuleRelationType.Incompatible) {
        // Only include in willDisable if target is currently ON
        const targetRule = ruleMap.value.get(r.target)
        if (targetRule?.value) {
          const existing = details.get(r.source) ?? { message: '', willDisable: [] }
          existing.willDisable.push(r.target)
          details.set(r.source, existing)
        }

        if (conflicts.value.has(r.target))
          details.set(r.target, {
            message: `Incompatible with ${camelCaseToProperCaseWithSpaces(RuleKey[r.source])}`,
            willDisable: [],
          })
      }

      if (r.type === RuleRelationType.Requires && conflicts.value.has(r.source))
        details.set(r.source, {
          message: `Requires ${camelCaseToProperCaseWithSpaces(RuleKey[r.target])}`,
          willDisable: [],
        })
    }

    return details
  })

  const rulesForCategory = (category: RuleCategory) =>
    computed(() =>
      [...ruleMap.value.values()]
        .filter(rule => rule.category === category)
        .map(rule => ({
          ...rule,
          enabled: !UNSUPPORTED_RULES.has(rule.key) && !conflicts.value.has(rule.key),
        }))
    )

  const toggleRuleValue = (key: RuleKey) => {
    if (!rulesConfig.value) throw new Error('Cannot toggle: no rules config loaded')
    if (isLocked.value) throw new Error('Cannot toggle: rules config is locked')
    const rule = ruleMap.value.get(key)
    if (rule) rule.value = !rule.value
  }

  const clearRulesConfig = () => {
    rulesConfig.value = null
  }

  return {
    rulesConfig,
    hasRulesConfig,
    rulesConfigId,
    isLocked,
    hydrateDefaults,
    saveRulesConfig,
    loadRulesConfig,
    updateRulesConfig,
    deleteRulesConfig,
    setRulesConfig,
    setStatus,
    conflictDetails,
    rulesForCategory,
    toggleRuleValue,
    clearRulesConfig,
  }
})
