import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { TechKey, TechUpgradeTransaction } from './types'

const upgradeKey = (tech: TechKey, spaceWreck: boolean) => `${tech}:${spaceWreck}`

export const useEconRoundStore = defineStore('econRound', () => {
  const mineralIncome = ref<number>(0)
  const setMineralIncome = (value: number) => {
    mineralIncome.value = value
  }

  // TEMPORARY: colony income is manually entered here until colony state is fully
  // transactional (tracked via build/attack transactions). When that is implemented,
  // this field should be removed and derived from the colony transaction history instead.
  const colonyIncome = ref<number>(0)
  const setColonyIncome = (value: number) => {
    colonyIncome.value = value
  }

  const bid = ref<number>(0)
  const setBid = (value: number) => {
    bid.value = value
  }

  // At most one standard upgrade and one Space Wreck upgrade (rule 28.0) per tech.
  // Key: `${TechKey}:${spaceWreck}`. Round is set by _game store on commit.
  const pendingUpgrades = ref<Map<string, TechUpgradeTransaction>>(new Map())

  const addUpgrade = (tech: TechKey, spaceWreck: boolean): boolean => {
    const key = upgradeKey(tech, spaceWreck)
    if (pendingUpgrades.value.has(key)) return false
    pendingUpgrades.value.set(key, { round: 0, tech, spaceWreck })
    return true
  }

  const removeUpgrade = (tech: TechKey, spaceWreck: boolean) => {
    pendingUpgrades.value.delete(upgradeKey(tech, spaceWreck))
  }

  const $reset = () => {
    mineralIncome.value = 0
    colonyIncome.value = 0
    bid.value = 0
    pendingUpgrades.value = new Map()
  }

  return {
    mineralIncome,
    colonyIncome,
    bid,
    pendingUpgrades,
    setMineralIncome,
    setColonyIncome,
    setBid,
    addUpgrade,
    removeUpgrade,
    $reset,
  }
})
