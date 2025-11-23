export const PLAYER_COLORS = ['red-700', 'green-700', 'yellow-300', 'blue-700', 'white'] as const
export type PlayerColor = typeof PLAYER_COLORS[number]

export const getPlayerColorBorder = (color: PlayerColor): string => {
  const colorMap: Record<PlayerColor, string> = {
    'red-700': 'border-red-700',
    'green-700': 'border-green-700',
    'yellow-300': 'border-yellow-300',
    'blue-700': 'border-blue-700',
    white: 'border-white',
  }
  return colorMap[color]
}

export const getPlayerColorText = (color: PlayerColor): string => {
  const colorMap: Record<PlayerColor, string> = {
    'red-700': 'text-red-700',
    'green-700': 'text-green-700',
    'yellow-300': 'text-yellow-300',
    'blue-700': 'text-blue-700',
    white: 'text-white',
  }
  return colorMap[color]
}

export const getPlayerColorBackground = (color: PlayerColor): string => {
  const colorMap: Record<PlayerColor, string> = {
    'red-700': 'bg-red-700',
    'green-700': 'bg-green-700',
    'yellow-300': 'bg-yellow-300',
    'blue-700': 'bg-blue-700',
    white: 'bg-white',
  }
  return colorMap[color]
}
