<script setup lang="ts">
import { useGameStore } from '@/entities/_game'
import NewScenarioButton from '@/features/dashboard-panel/ui/NewScenarioButton.vue'

const gameStore = useGameStore()

const handleInitiateGame = () => {
  gameStore.setGame()
}
</script>

<template>
  <div class="w-full h-full flex items-center justify-center">
    <NewScenarioButton v-if="!gameStore.isGameInstantiated" @startScenario="handleInitiateGame" />
    <div v-else class="text-white">
      <p>Game initiated! Dashboard content goes here.</p>
    </div>
  </div>
</template>

<style scoped></style>
