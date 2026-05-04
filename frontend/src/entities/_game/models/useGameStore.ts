import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { Game } from './types'
import type { RulesConfig } from '@/entities/rules'
import { useRulesConfigStore } from '@/entities/rules'

export const useGameStore = defineStore(
  'game',
  () => {
    const rulesConfigStore = useRulesConfigStore()

    // State
    const game = ref<Game | null>(null)

    // Getters
    const isGameInstantiated = computed(() => game.value !== null)
    // Reason for ternary: if game is not instantiated you will get unexpected behavior
    const hasRules = computed(() => isGameInstantiated.value ? game.value?.rules !== null : false)

    // Actions
    const setGame = () => {
      game.value = {
        id: '',
        rules: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    }

    const createRules = async () => {
      if (!game.value) throw new Error('Cannot create rules: game is not instantiated')
      await rulesConfigStore.hydrateDefaults()
      // clearGame() may have run during the await — discard the hydrated config if so
      if (!game.value) {
        rulesConfigStore.clearRulesConfig()
        return
      }
    }

    const embedRulesConfig = (rulesConfig: RulesConfig) => {
      if (!game.value) throw new Error('Cannot embed rules: game is not instantiated')
      game.value.rules = rulesConfig
    }

    const clearGame = () => {
      rulesConfigStore.clearRulesConfig()
      game.value = null
    }

    return {
      game,
      isGameInstantiated,
      hasRules,
      setGame,
      createRules,
      embedRulesConfig,
      clearGame,
    }
  },
  // TODO: Persist store
)