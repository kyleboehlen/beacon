import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Game } from './types'

export const useGameStore = defineStore(
  'game',
  () => {
    // State
    const game = ref<Game | null>(null)

    // Getters
    const isGameInstantiated = computed(() => game.value !== null)

    // Actions
    const setGame = () => {
      game.value = {
        id: '',
        rules: null,
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

      // Actions
      setGame,
      clearGame,
    }
  },
  // TODO: Persist store
)
