import { beforeEach, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import DashboardPanel from './DashboardPanel.vue'
import { useGameStore } from '@/entities/_game'
import { useEconStore } from '@/entities/econ'
import { TechKey } from '@/entities/econ'
import type { RulesConfig } from '@/entities/rules'
import { TechLevelTree } from '@/shared/ui/tech-level-tree'

describe('DashboardPanel', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('shows new scenario button when no game exists', () => {
    const wrapper = mount(DashboardPanel)
    expect(wrapper.text()).toContain('Initiate New Scenario')
  })

  it('shows rules setup prompt when game exists without rules', () => {
    const gameStore = useGameStore()
    gameStore.setGame()

    const wrapper = mount(DashboardPanel)
    expect(wrapper.text()).toContain('Configure game rules in settings to begin...')
  })

  it('renders one tech tree per derived tech state entry when rules exist', () => {
    const gameStore = useGameStore()
    const econStore = useEconStore()
    gameStore.setGame()
    if (!gameStore.game) throw new Error('game should be instantiated')
    gameStore.game.rules = {} as RulesConfig

    econStore.setTechDefinitions([
      {
        key: TechKey.Attack,
        displayName: 'Attack',
        startingLevel: 0,
        maxLevel: 2,
        upgradeCosts: [10, 20],
        gateRuleKey: null,
        gatedFromLevel: null,
        notes: null,
        levelNotes: null,
      },
      {
        key: TechKey.Move,
        displayName: 'Move',
        startingLevel: 1,
        maxLevel: 3,
        upgradeCosts: [12, 18],
        gateRuleKey: null,
        gatedFromLevel: null,
        notes: null,
        levelNotes: null,
      },
    ])

    const wrapper = mount(DashboardPanel)
    const trees = wrapper.findAllComponents(TechLevelTree)
    expect(trees).toHaveLength(2)
    expect(trees[0].props('interactive')).toBe(false)
  })
})
