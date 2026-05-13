import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useEconStore } from './useEconStore'
import { TechKey } from './types'

const getTechDefinitions = vi.fn()

vi.mock('../api/useEconApi', () => ({
  useEconApi: () => ({
    getTechDefinitions,
  }),
}))

describe('useEconStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    getTechDefinitions.mockReset()
  })

  it('starts with an empty techDefinitions list', () => {
    const store = useEconStore()
    expect(store.techDefinitions).toEqual([])
  })

  it('fetchTechDefinitions stores and returns API results', async () => {
    const store = useEconStore()
    getTechDefinitions.mockResolvedValue({
      techDefinitions: [{
        key: 0,
        displayName: 'Attack',
        startingLevel: 0,
        maxLevel: 3,
        upgradeCosts: [10, 20, 30],
        gateRuleKey: null,
        gatedFromLevel: null,
        notes: null,
        levelNotes: null,
      }],
    })

    const result = await store.fetchTechDefinitions()

    expect(result).toHaveLength(1)
    expect(store.techDefinitions).toHaveLength(1)
    expect(store.techDefinitions[0].displayName).toBe('Attack')
  })

  it('fetchTechDefinitions throws when API fails', async () => {
    const store = useEconStore()
    getTechDefinitions.mockResolvedValue(false)

    await expect(store.fetchTechDefinitions()).rejects.toThrow('Failed to fetch tech definitions')
  })

  it('derives current and staged tech levels from committed and pending upgrade transactions', () => {
    const store = useEconStore()

    store.setTechDefinitions([{
      key: TechKey.Attack,
      displayName: 'Attack',
      startingLevel: 1,
      maxLevel: 3,
      upgradeCosts: [10, 20],
      gateRuleKey: null,
      gatedFromLevel: null,
      notes: null,
      levelNotes: null,
    }])

    store.techUpgrades.push({ round: 1, tech: TechKey.Attack, spaceWreck: false })
    store.stageUpgrade(TechKey.Attack, false)

    expect(store.techState).toHaveLength(1)
    expect(store.techState[0].currentLevel).toBe(2)
    expect(store.techState[0].stagedLevel).toBe(3)
  })

  it('commits active round and staged upgrades as transactions', () => {
    const store = useEconStore()
    store.setMineralIncome(8)
    store.setColonyIncome(3)
    store.setBid(2)
    store.stageUpgrade(TechKey.Move, false)

    store.commitActiveRound()

    expect(store.econRounds).toHaveLength(1)
    expect(store.econRounds[0]).toMatchObject({ round: 1, mineralIncome: 8, colonyIncome: 3, bid: 2 })
    expect(store.techUpgrades).toHaveLength(1)
    expect(store.techUpgrades[0]).toMatchObject({ round: 1, tech: TechKey.Move, spaceWreck: false })
    expect(store.activeRound.round).toBe(2)
    expect(store.pendingUpgrades.size).toBe(0)
  })
})
