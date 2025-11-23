import { useBeaconApi } from '@/shared/api/useBeaconApi'
import { type HealthCheckResponse } from '@/shared/models'

export const useHealthCheckApi = () => {
  const { beaconApiCall } = useBeaconApi()

  const getHealthCheck = async (): Promise<HealthCheckResponse> => {
    const response = await beaconApiCall<null, HealthCheckResponse>('GET', '/HealthCheck')

    if (response === false) {
      return {
        environment: 'unknown',
        database: false,
        emailService: false,
      } as HealthCheckResponse
    }

    return response as HealthCheckResponse
  }

  return {
    getHealthCheck,
  }
}
