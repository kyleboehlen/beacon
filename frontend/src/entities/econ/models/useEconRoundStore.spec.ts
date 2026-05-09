import { describe, it, expect, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useEconRoundStore } from './useEconRoundStore'
import { TechKey } from './types'

describe('useEconRoundStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe('addUpgrade', () => {
    it('returns true and stages the upgrade on first add', () => {
      const store = useEconRoundStore()
      const result = store.addUpgrade(TechKey.Attack, false)
      expect(result).toBe(true)
      expect(store.pendingUpgrades.size).toBe(1)
    })

    it('returns false when the same tech and spaceWreck combo already exists', () => {
      const store = useEconRoundStore()
      store.addUpgrade(TechKey.Attack, false)
      const result = store.addUpgrade(TechKey.Attack, false)
      expect(result).toBe(false)
      expect(store.pendingUpgrades.size).toBe(1)
    })

    it('allows a standard and a space wreck upgrade for the same tech', () => {
      const store = useEconRoundStore()
      const standard = store.addUpgrade(TechKey.Attack, false)
      const wreck = store.addUpgrade(TechKey.Attack, true)
      expect(standard).toBe(true)
      expect(wreck).toBe(true)
      expect(store.pendingUpgrades.size).toBe(2)
    })
  })

  describe('removeUpgrade', () => {
    it('removes a staged upgrade', () => {
      const store = useEconRoundStore()
      store.addUpgrade(TechKey.Move, false)
      store.removeUpgrade(TechKey.Move, false)
      expect(store.pendingUpgrades.size).toBe(0)
    })
  })

  describe('$reset', () => {
    it('clears all state', () => {
      const store = useEconRoundStore()
      store.setMineralIncome(10)
      store.setColonyIncome(5)
      store.setBid(2)
      store.addUpgrade(TechKey.Defense, false)

      store.$reset()

      expect(store.mineralIncome).toBe(0)
      expect(store.colonyIncome).toBe(0)
      expect(store.bid).toBe(0)
      expect(store.pendingUpgrades.size).toBe(0)
    })
  })
})