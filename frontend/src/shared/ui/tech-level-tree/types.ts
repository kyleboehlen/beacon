
export type NodeState = 'purchased' | 'staged' | 'purchasable' | 'disabled'

export interface LevelNode {
  description?: string
  cost?: number
  state: NodeState
}
