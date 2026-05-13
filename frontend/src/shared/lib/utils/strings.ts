/**
 * Converts a camelCase string to Proper Case with spaces
 * Examples:
 * - "msPipelines" -> "Ms Pipelines"
 * - "defenseSatelliteNetworks" -> "Defense Satellite Networks"
 * - "boardingShips" -> "Boarding Ships"
 */
export function camelCaseToProperCaseWithSpaces(str: string): string {
  // Insert space before uppercase letters
  const withSpaces = str.replace(/([A-Z])/g, ' $1')

  // Capitalize first letter and trim any leading space
  return withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1).trim()
}
