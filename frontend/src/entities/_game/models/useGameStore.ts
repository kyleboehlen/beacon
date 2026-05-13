import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { Game } from './types'
import type { RulesConfig, RuleOption } from '@/entities/rules'
import { RulesConfigStatus, useRulesConfigStore } from '@/entities/rules'
import type { TechDefinition } from '@/entities/econ'
import { useEconStore } from '@/entities/econ'

const filterTechDefinitionsByRules = (rulesConfig: RulesConfig, allTechDefs: TechDefinition[]) =>
  allTechDefs.filter(def => {
    if (def.gateRuleKey === null) return true

    for (const value of Object.values(rulesConfig)) {
      if (value !== null && typeof value === 'object' && 'key' in value) {
        const rule = value as RuleOption<boolean>
        if (rule.key === def.gateRuleKey) {
          if (rule.value) return true
          // Rule disabled: keep the tech only if some levels don't require it.
          // gatedFromLevel marks where the gate kicks in; levels below it are always valid.
          return def.gatedFromLevel !== null
        }
      }
    }

    return false
  })

export const useGameStore = defineStore(
  'game',
  () => {
    const rulesConfigStore = useRulesConfigStore()
    const econStore = useEconStore()

    // State
    const game = ref<Game | null>(null)

    // Getters
    const isGameInstantiated = computed(() => game.value !== null)
    // Reason for ternary: if game is not instantiated you will get unexpected behavior
    const hasRules = computed(() => isGameInstantiated.value ? game.value?.rules !== null : false)

    const techState = computed(() => econStore.techState)

    // Available CP = historical mineral income
    //              - historical upgrade costs
    //              + current round mineral
    //              + colony income (from econ round store)
    //              - current round staged upgrade costs
    //        TODO: - historical ship building costs
    //        TODO: - current round ship building costs
    const cpBalance = computed(() => {
      if (!game.value) return 0

      const historicalIncome = econStore.econRounds.reduce(
        // TEMPORARY: colonyIncome is manually entered until colony transactions are tracked.
        (sum, round) => sum + round.mineralIncome + round.colonyIncome, 0,
      )

      // Track how many times each tech has been upgraded so we index into upgradeCosts correctly.
      const committedCountByTech = new Map<number, number>()
      const committedUpgradeCost = econStore.techUpgrades.reduce((sum, upgrade) => {
        const def = game.value!.techDefinitions.find(d => d.key === upgrade.tech)
        if (!def) return sum
        const count = committedCountByTech.get(upgrade.tech) ?? 0
        committedCountByTech.set(upgrade.tech, count + 1)
        if (upgrade.spaceWreck) return sum
        return sum + (def.upgradeCosts[count] ?? 0)
      }, 0)

      const currentRoundIncome = econStore.activeRound.mineralIncome + econStore.activeRound.colonyIncome

      // Staged upgrades are indexed starting after any already-committed upgrades for that tech.
      const stagedCountByTech = new Map<number, number>()
      const stagedUpgradeCost = [...econStore.pendingUpgrades.values()].reduce(
        (sum, upgrade) => {
          const def = game.value!.techDefinitions.find(d => d.key === upgrade.tech)
          if (!def) return sum
          const committed = committedCountByTech.get(upgrade.tech) ?? 0
          const staged = stagedCountByTech.get(upgrade.tech) ?? 0
          stagedCountByTech.set(upgrade.tech, staged + 1)
          if (upgrade.spaceWreck) return sum
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
      econStore.clearEconState()
    }

    const lockRulesConfig = async () => {
      if (!game.value) throw new Error('Cannot lock rules: game is not instantiated')
      if (!rulesConfigStore.rulesConfig) throw new Error('Cannot lock rules: no rules config loaded')

      rulesConfigStore.setStatus(RulesConfigStatus.Active)
      await rulesConfigStore.saveRulesConfig()

      if (!rulesConfigStore.rulesConfig) throw new Error('Cannot lock rules: failed to load saved rules config')

      const allTechDefs = await econStore.fetchTechDefinitions()
      const filteredTechDefs = filterTechDefinitionsByRules(rulesConfigStore.rulesConfig, allTechDefs)

      game.value.rules = rulesConfigStore.rulesConfig
      game.value.techDefinitions = filteredTechDefs
      econStore.setTechDefinitions(filteredTechDefs)
    }

    // Commits the current econ round transactions and mirrors them into the game snapshot.
    const commitEconRound = () => {
      if (!game.value) throw new Error('Cannot commit econ round: game is not instantiated')
      econStore.commitActiveRound()
      game.value.econRounds = [...econStore.econRounds]
      game.value.techUpgrades = [...econStore.techUpgrades]
    }

    const clearGame = () => {
      rulesConfigStore.clearRulesConfig()
      econStore.clearEconState()
      game.value = null
    }

    const econ = {
      activeRound: econStore.activeRound,
      pendingUpgrades: econStore.pendingUpgrades,
      techDefinitions: econStore.techDefinitions,
      techState: computed(() => econStore.techState),
      createNewRound: econStore.createNewRound,
      setMineralIncome: econStore.setMineralIncome,
      setColonyIncome: econStore.setColonyIncome,
      setBid: econStore.setBid,
      stageUpgrade: econStore.stageUpgrade,
      unstageUpgrade: econStore.unstageUpgrade,
      commitRound: commitEconRound,
    }

    return {
      game,
      isGameInstantiated,
      hasRules,
      techState,
      cpBalance,
      econ,
      setGame,
      lockRulesConfig,
      commitEconRound,
      clearGame,
    }
  },
  { persist: true },
)
