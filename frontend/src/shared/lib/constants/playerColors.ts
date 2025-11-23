export const PLAYER_COLORS = ['red-700', 'green-700', 'yellow-300', 'blue-700', 'white'] as const
export type PlayerColor = typeof PLAYER_COLORS[number]

const getPlayerColorClass = (color: PlayerColor, prefix: string): string => {
  return `${prefix}-${color}`
}

export const getPlayerColorBorder = (color: PlayerColor): string =>
  getPlayerColorClass(color, 'border')

export const getPlayerColorText = (color: PlayerColor): string =>
  getPlayerColorClass(color, 'text')

export const getPlayerColorBackground = (color: PlayerColor): string =>
  getPlayerColorClass(color, 'bg')
