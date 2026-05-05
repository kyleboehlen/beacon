import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { RulesConfig, RuleKey } from './types'
import { RulesConfigStatus, RuleCategory } from './types'
import type { RuleOption } from './types'
import { useRulesApi } from '@/entities/rules/api/useRulesApi'

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

  const rulesForCategory = (category: RuleCategory) =>
    computed(() => {
      if (!rulesConfig.value) return []
      return (Object.entries(rulesConfig.value) as [string, unknown][])
        .filter((entry): entry is [string, RuleOption<boolean>] =>
          entry[1] !== null && typeof entry[1] === 'object' && 'category' in (entry[1] as object)
        )
        .filter(([, rule]) => rule.category === category)
        .map(([key, rule]) => ({ key: key as RuleKey, ...rule }))
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
    rulesForCategory,
    toggleRuleValue,
    clearRulesConfig,
  }
})