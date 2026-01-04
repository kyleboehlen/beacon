import type { RulesConfig } from '@/shared/models/generated/rules-config.ts'
import { useRulesApi } from '@/entities/rules/api/useRulesApi.ts'

export const useRules = () => {
  const { hydrateRulesConfig } = useRulesApi()

  const getBlankRulesConfig = async (): Promise<RulesConfig | null> => {
    const response = await hydrateRulesConfig()

    if (response === false) {
      return null
    }

    return {
      ...response.defaultRulesConfig,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  }

  return {
    getBlankRulesConfig,
  }
}
