import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { RulesConfig, RuleKey } from './types'
import { RulesConfigStatus, RuleCategory, RuleRelationType } from './types'
import type { RuleOption } from './types'
import { useRulesApi } from '@/entities/rules/api/useRulesApi'
import { camelCaseToProperCase } from '@/shared/lib/utils/strings'

// Rules that exist in the rulebook but are intentionally unsupported
const UNSUPPORTED_RULES = new Set<RuleKey>(['instantUpgrades'])

export const useRulesConfigStore = defineStore('rulesConfig', () => {
  const api = useRulesApi()

  // State
  const rulesConfig = ref<RulesConfig | null>(null)

  // Getters
  const hasRulesConfig = computed(() => rulesConfig.value !== null)
  const rulesConfigId = computed(() => rulesConfig.value?.id ?? null)
  const isLocked = computed(() => rulesConfig.value?.status === RulesConfigStatus.Active)

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

  // Maps each conflicted rule key to the source rule key causing the conflict
  const conflicts = computed(() => {
    const conflicted = new Map<RuleKey, RuleKey>()
    if (!rulesConfig.value) return conflicted

    for (const { source, target, type } of rulesConfig.value.ruleRelationships) {
      const sourceRule = rulesConfig.value[source as RuleKey] as RuleOption<boolean> | undefined
      if (!sourceRule) continue

      if (type === RuleRelationType.Incompatible && sourceRule.value)
        conflicted.set(target as RuleKey, source as RuleKey)

      if (type === RuleRelationType.Requires) {
        const targetRule = rulesConfig.value[target as RuleKey] as RuleOption<boolean> | undefined
        if (targetRule && !targetRule.value)
          conflicted.set(source as RuleKey, target as RuleKey)
      }
    }

    return conflicted
  })

  // Pre-computed conflict details per rule key — used by rulesForCategory for cheap lookup
  const conflictDetails = computed(() => {
    const details = new Map<RuleKey, { message: string; willDisable: RuleKey[] }>()
    if (!rulesConfig.value) return details

    for (const r of rulesConfig.value.ruleRelationships) {
      const sourceKey = r.source as RuleKey
      const targetKey = r.target as RuleKey

      if (r.type === RuleRelationType.Incompatible) {
        // Only include in willDisable if target is currently ON (so there's actually something to turn off)
        const targetRule = rulesConfig.value[targetKey] as RuleOption<boolean> | undefined
        if (targetRule?.value) {
          const existing = details.get(sourceKey) ?? { message: '', willDisable: [] }
          existing.willDisable.push(targetKey)
          details.set(sourceKey, existing)
        }

        if (conflicts.value.has(targetKey))
          details.set(targetKey, { message: `Incompatible with ${camelCaseToProperCase(r.source)}`, willDisable: [] })
      }

      if (r.type === RuleRelationType.Requires && conflicts.value.has(sourceKey)) {
        details.set(sourceKey, { message: `Requires ${camelCaseToProperCase(r.target)}`, willDisable: [] })
      }
    }

    return details
  })

  const rulesForCategory = (category: RuleCategory) =>
    computed(() => {
      if (!rulesConfig.value) return []
      return (Object.entries(rulesConfig.value) as [string, unknown][])
        .filter((entry): entry is [string, RuleOption<boolean>] =>
          entry[1] !== null && typeof entry[1] === 'object' && 'category' in (entry[1] as object)
        )
        .filter(([, rule]) => rule.category === category)
        .map(([key, rule]) => {
          const ruleKey = key as RuleKey
          return {
            key: ruleKey,
            ...rule,
            enabled: !UNSUPPORTED_RULES.has(ruleKey) && !conflicts.value.has(ruleKey),
          }
        })
    })

  const toggleRuleValue = (key: RuleKey) => {
    if (!rulesConfig.value) throw new Error('Cannot toggle: no rules config loaded')
    if (isLocked.value) throw new Error('Cannot toggle: rules config is locked')
    const rule = rulesConfig.value[key] as RuleOption<boolean>
    rule.value = !rule.value
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