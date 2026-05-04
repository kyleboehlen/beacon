import { useBeaconApi } from '@/shared/api/useBeaconApi.ts'
import type { HydrateRulesConfigResponse } from '@/shared/models/generated/hydrate-rules-config-response.ts'
import type { CreateRulesConfigResponse } from '@/shared/models/generated/create-rules-config-response.ts'
import type { GetRulesConfigResponse } from '@/shared/models/generated/get-rules-config-response.ts'
import type { UpdateRulesConfigResponse } from '@/shared/models/generated/update-rules-config-response.ts'
import type { DeleteRulesConfigResponse } from '@/shared/models/generated/delete-rules-config-response.ts'
import type { SaveRulesConfigRequest } from '@/shared/models/generated/save-rules-config-request.ts'

export const useRulesApi = () => {
  const { beaconApiCall } = useBeaconApi()

  const hydrateRulesConfig = async (): Promise<HydrateRulesConfigResponse | false> => {
    return await beaconApiCall<void, HydrateRulesConfigResponse>('GET', '/Rules/HydrateRulesConfig')
  }

  const createRulesConfig = async (request: SaveRulesConfigRequest): Promise<CreateRulesConfigResponse | false> => {
    return await beaconApiCall<SaveRulesConfigRequest, CreateRulesConfigResponse>('POST', '/Rules/CreateRulesConfig', request)
  }

  const getRulesConfig = async (id: string): Promise<GetRulesConfigResponse | false> => {
    return await beaconApiCall<void, GetRulesConfigResponse>('GET', `/Rules/GetRulesConfig/${id}`)
  }

  const updateRulesConfig = async (id: string, request: SaveRulesConfigRequest): Promise<UpdateRulesConfigResponse | false> => {
    return await beaconApiCall<SaveRulesConfigRequest, UpdateRulesConfigResponse>('PUT', `/Rules/UpdateRulesConfig/${id}`, request)
  }

  const deleteRulesConfig = async (id: string): Promise<DeleteRulesConfigResponse | false> => {
    return await beaconApiCall<void, DeleteRulesConfigResponse>('DELETE', `/Rules/DeleteRulesConfig/${id}`)
  }

  return {
    hydrateRulesConfig,
    createRulesConfig,
    getRulesConfig,
    updateRulesConfig,
    deleteRulesConfig,
  }
}