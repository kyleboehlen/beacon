import { useBeaconApi } from '@/shared/api/useBeaconApi'
import { HealthCheckResponse } from '@/shared/models/generated'

export const useHealthCheckApi = () => {
  const { beaconApiCall } = useBeaconApi()

  const getHealthCheck = async (): Promise<HealthCheckResponse> => {
    return await beaconApiCall<null, HealthCheckResponse>('GET', '/HealthCheck')
  }

  return {
    getHealthCheck
  }
}
