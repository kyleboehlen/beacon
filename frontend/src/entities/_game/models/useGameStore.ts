import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { Game } from './types'
import type { RulesConfig, RuleOption } from '@/entities/rules'
import { useRulesConfigStore } from '@/entities/rules'
import type { TechDefinition } from '@/entities/econ'
import { useEconRoundStore } from '@/entities/econ'

export const useGameStore = defineStore(
  'game',
  () => {
    const rulesConfigStore = useRulesConfigStore()
    const econRoundStore = useEconRoundStore()

    // State
    const game = ref<Game | null>(null)

    // Getters
    const isGameInstantiated = computed(() => game.value !== null)
    // Reason for ternary: if game is not instantiated you will get unexpected behavior
    const hasRules = computed(() => isGameInstantiated.value ? game.value?.rules !== null : false)

    // Current level for each applicable tech, derived from committed upgrade transactions.
    const techTreeState = computed(() =>
      (game.value?.techDefinitions ?? []).map(def => {
        const upgradeCount = game.value!.techUpgrades.filter(u => u.tech === def.key).length
        return {
          definition: def,
          currentLevel: def.startingLevel + upgradeCount,
        }
      })
    )

    // Available CP = historical mineral income
    //              - historical upgrade costs
    //              + current round mineral
    //              + colony income (from econ round store)
    //              - current round staged upgrade costs
    //        TODO: - historical ship building costs
    //        TODO: - current round ship building costs
    const cpBalance = computed(() => {
      if (!game.value) return 0

      const historicalIncome = game.value.econRounds.reduce(
        (sum, round) => sum + round.mineralIncome, 0,
      )

      // Track how many times each tech has been upgraded so we index into upgradeCosts correctly.
      const committedCountByTech = new Map<number, number>()
      const committedUpgradeCost = game.value.techUpgrades.reduce((sum, upgrade) => {
        const def = game.value!.techDefinitions.find(d => d.key === upgrade.tech)
        if (!def) return sum
        const count = committedCountByTech.get(upgrade.tech) ?? 0
        committedCountByTech.set(upgrade.tech, count + 1)
        return sum + (def.upgradeCosts[count] ?? 0)
      }, 0)

      const currentRoundIncome = econRoundStore.mineralIncome + econRoundStore.colonyIncome

      // Staged upgrades are indexed starting after any already-committed upgrades for that tech.
      const stagedCountByTech = new Map<number, number>()
      const stagedUpgradeCost = [...econRoundStore.pendingUpgrades.values()].reduce(
        (sum, upgrade) => {
          const def = game.value!.techDefinitions.find(d => d.key === upgrade.tech)
          if (!def) return sum
          const committed = committedCountByTech.get(upgrade.tech) ?? 0
          const staged = stagedCountByTech.get(upgrade.tech) ?? 0
          stagedCountByTech.set(upgrade.tech, staged + 1)
          return sum + (def.upgradeCosts[committed + staged] ?? 0)
        },
        0,
      )

        // TODO: Decrease cp based on ship purchases

      return historicalIncome - committedUpgradeCost + currentRoundIncome - stagedUpgradeCost
    })

    // Actions
    const setGame = () => {
      game.value = {
        id: '',
        rules: null,
        techDefinitions: [],
        econRounds: [],
        techUpgrades: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    }

    const embedRulesConfig = (rulesConfig: RulesConfig) => {
      if (!game.value) throw new Error('Cannot embed rules: game is not instantiated')
      game.value.rules = rulesConfig
    }

    // Locks rules and filters the full tech catalog to only techs applicable to this session.
    const setRulesAndTechDefinitions = (rulesConfig: RulesConfig, allTechDefs: TechDefinition[]) => {
      if (!game.value) throw new Error('Cannot set rules: game is not instantiated')
      game.value.rules = rulesConfig

      game.value.techDefinitions = allTechDefs.filter(def => {
        if (def.gateRuleKey === null) return true

        for (const value of Object.values(rulesConfig)) {
          if (value !== null && typeof value === 'object' && 'key' in value) {
            const rule = value as RuleOption<boolean>
            if (rule.key === def.gateRuleKey) return rule.value
          }
        }

        return false
      })
    }

    // Commits the current econ wizard round to the game history and resets the wizard store.
    const commitEconRound = () => {
      if (!game.value) throw new Error('Cannot commit econ round: game is not instantiated')

      const round = game.value.econRounds.length + 1

      game.value.econRounds.push({
        round,
        mineralIncome: econRoundStore.mineralIncome,
        bid: econRoundStore.bid,
      })

      for (const upgrade of econRoundStore.pendingUpgrades.values()) {
        game.value.techUpgrades.push({ ...upgrade, round })
      }

      econRoundStore.$reset()
    }

    const clearGame = () => {
      rulesConfigStore.clearRulesConfig()
      econRoundStore.$reset()
      game.value = null
    }

    return {
      game,
      isGameInstantiated,
      hasRules,
      techTreeState,
      cpBalance,
      setGame,
      embedRulesConfig,
      setRulesAndTechDefinitions,
      commitEconRound,
      clearGame,
    }
  },
  { persist: true },
)
