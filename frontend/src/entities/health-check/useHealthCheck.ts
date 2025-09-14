import { useHealthCheckApi } from './api/useHealthCheckApi'

export const useHealthCheck = () => {
  const { getHealthCheck } = useHealthCheckApi()

  const consoleLogHealthStatus = async (): void => {
      const response = await getHealthCheck()

      if (!!response) {
        const dbStatus = response.database ? 'ONLINE' : 'OFFLINE'
        const emailStatus = response.emailService ? 'ONLINE' : 'OFFLINE'
        const env = response.environment.toUpperCase()

        // CSS styles for console
        const onlineStyle = 'background-color: green; color: white; padding: 2px 8px; border-radius: 3px;'
        const offlineStyle = 'background-color: red; color: white; padding: 2px 8px; border-radius: 3px;'
        const envStyle = 'background-color: blue; color: white; padding: 2px 8px; border-radius: 3px;'

        console.log(`%cDatabase: ${dbStatus}`, response.database ? onlineStyle : offlineStyle)
        console.log(`%cEmail: ${emailStatus}`, response.emailService ? onlineStyle : offlineStyle)
        console.log(`%cEnvironment: ${env}`, envStyle)
      } else {
        console.log(`%cAPI UNREACHABLE`, offlineStyle)
      }
  }

  return { consoleLogHealthStatus }
}
