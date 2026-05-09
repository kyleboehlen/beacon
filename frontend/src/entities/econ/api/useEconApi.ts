import { useBeaconApi } from '@/shared/api/useBeaconApi.ts'
import type { GetTechDefinitionsResponse } from '@/shared/models/generated/get-tech-definitions-response.ts'

export const useEconApi = () => {
  const { beaconApiCall } = useBeaconApi()

  const getTechDefinitions = async (): Promise<GetTechDefinitionsResponse | false> => {
    return await beaconApiCall<void, GetTechDefinitionsResponse>('GET', '/Econ/GetTechDefinitions')
  }

  return {
    getTechDefinitions,
  }
}