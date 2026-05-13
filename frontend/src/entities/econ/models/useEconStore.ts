import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useEconApi } from '../api/useEconApi'
import type { EconTransaction, TechDefinition, TechKey, TechStateEntry, TechUpgradeTransaction } from './types'

const upgradeKey = (tech: TechKey, spaceWreck: boolean) => `${tech}:${spaceWreck}`

export const useEconStore = defineStore('econ', () => {
  const api = useEconApi()
  const techDefinitions = ref<TechDefinition[]>([])
  const econRounds = ref<EconTransaction[]>([])
  const techUpgrades = ref<TechUpgradeTransaction[]>([])
  const activeRound = ref<EconTransaction>({
    round: 1,
    mineralIncome: 0,
    colonyIncome: 0,
    bid: 0,
  })
  const pendingUpgrades = ref<Map<string, TechUpgradeTransaction>>(new Map())

  const techState = computed<TechStateEntry[]>(() =>
    techDefinitions.value.map(definition => {
      const committedCount = techUpgrades.value.filter(u => u.tech === definition.key).length
      const stagedCount = [...pendingUpgrades.value.values()].filter(u => u.tech === definition.key).length
      return {
        definition,
        currentLevel: definition.startingLevel + committedCount,
        stagedLevel: definition.startingLevel + committedCount + stagedCount,
      }
    })
  )

  const fetchTechDefinitions = async (): Promise<TechDefinition[]> => {
    const response = await api.getTechDefinitions()
    if (response === false) throw new Error('Failed to fetch tech definitions')
    techDefinitions.value = response.techDefinitions
    return techDefinitions.value
  }

  const setTechDefinitions = (definitions: TechDefinition[]) => {
    techDefinitions.value = definitions
  }

  const createNewRound = () => {
    const nextRound = econRounds.value.length + 1
    activeRound.value = {
      round: nextRound,
      mineralIncome: 0,
      colonyIncome: 0,
      bid: 0,
    }
    pendingUpgrades.value = new Map()
  }

  const setMineralIncome = (value: number) => {
    activeRound.value.mineralIncome = value
  }

  const setColonyIncome = (value: number) => {
    activeRound.value.colonyIncome = value
  }

  const setBid = (value: number) => {
    activeRound.value.bid = value
  }

  const stageUpgrade = (tech: TechKey, spaceWreck: boolean): boolean => {
    const key = upgradeKey(tech, spaceWreck)
    if (pendingUpgrades.value.has(key)) return false
    pendingUpgrades.value.set(key, { round: activeRound.value.round, tech, spaceWreck })
    return true
  }

  const unstageUpgrade = (tech: TechKey, spaceWreck: boolean) => {
    pendingUpgrades.value.delete(upgradeKey(tech, spaceWreck))
  }

  const commitActiveRound = () => {
    const round = activeRound.value.round
    econRounds.value.push({ ...activeRound.value })

    for (const upgrade of pendingUpgrades.value.values()) {
      techUpgrades.value.push({
        ...upgrade,
        round,
      })
    }

    createNewRound()
  }

  const clearEconState = () => {
    techDefinitions.value = []
    econRounds.value = []
    techUpgrades.value = []
    activeRound.value = {
      round: 1,
      mineralIncome: 0,
      colonyIncome: 0,
      bid: 0,
    }
    pendingUpgrades.value = new Map()
  }

  return {
    techDefinitions,
    techState,
    econRounds,
    techUpgrades,
    activeRound,
    pendingUpgrades,
    fetchTechDefinitions,
    setTechDefinitions,
    createNewRound,
    setMineralIncome,
    setColonyIncome,
    setBid,
    stageUpgrade,
    unstageUpgrade,
    commitActiveRound,
    clearEconState,
  }
})
