import { useBeaconApi } from '@/shared/api/useBeaconApi.ts'
import type { HydrateRulesConfigResponse } from '@/shared/models/generated/hydrate-rules-config-response.ts'

export const useRulesApi = () => {
  const { beaconApiCall } = useBeaconApi()

  const hydrateRulesConfig = async (): Promise<HydrateRulesConfigResponse | false> => {
    return await beaconApiCall<void, HydrateRulesConfigResponse>(
      'GET',
      '/Rules/HydrateRulesConfig'
    )
  }

  return {
    hydrateRulesConfig,
  }
}
