import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { Game } from './types'

export const useGameStore = defineStore(
  'game',
  () => {
    // State
    const game = ref<Game | null>(null)

    // Getters
    const isGameInstantiated = computed(() => game.value !== null)
    // Reason for ternary statement: if the game is not initiated you will get unexpected behavior
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

    const createRules = () => {
      if (!game.value) {
        throw new Error('Cannot create rules: game is not instantiated')
      }

      game.value.rules = {
        id: crypto.randomUUID(),
        raiders: false,
        msPipelines: false,
        mines: false,
        fighters: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    }

    const clearGame = () => {
      game.value = null
    }

    return {
      // State
      game,

      // Getters
      isGameInstantiated,
      hasRules,

      // Actions
      setGame,
      createRules,
      clearGame,
    }
  },
  // TODO: Persist store
)
