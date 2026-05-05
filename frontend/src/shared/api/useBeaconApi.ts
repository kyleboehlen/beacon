import { type BeaconResponse } from '@/shared/models'
import { useToast } from '@/shared/lib/composables/useToast'

export const useBeaconApi = () => {
  const baseUrl = import.meta.env.VITE_BEACON_API_URL
  const toast = useToast()

  const beaconApiCall = async <T, R>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    endpoint: string,
    body?: T,
  ): Promise<R | false> => {
    const response = await fetch(baseUrl + endpoint, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : undefined,
    })

    if (!response.ok) {
      toast.error('An unexpected error occurred. Please try again.')
      return false
    }

    const responseJson: BeaconResponse<R> = await response.json()
    if (!responseJson.success) {
      responseJson.errors?.forEach(error => toast.error(error.message))
      return false
    }

    return responseJson.payload as R
  }

  return {
    beaconApiCall,
  }
}
