import { BeaconResponse } from '@/shared/models/generated'
export const useBeaconApi = () => {
  const baseUrl = import.meta.env.VITE_BEACON_API_URL

  // API call returns the payload of type R if successful, otherwise returns false
  const beaconApiCall = async <T, R>(method: 'GET' | 'POST', endpoint: string, body?: T): Promise<R> | boolean => {
    const response = await fetch(baseUrl + endpoint, {
      method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: body ? JSON.stringify(body) : undefined
    })

    if (!response.ok) {
      return false
    }

    const responseJson: BeaconResponse<R> = await response.json()
    if (!responseJson.success) {
      return false
    }

    return responseJson.payload as R
  }

  return {
    beaconApiCall
  }
}
