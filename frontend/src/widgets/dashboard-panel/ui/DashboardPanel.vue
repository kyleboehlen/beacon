<script setup lang="ts">
import { useGameStore } from '@/entities/_game'
import { TechTreeChart } from '@/features/tech-tree'
import NewScenarioButton from './NewScenarioButton.vue'

const gameStore = useGameStore()

const emit = defineEmits<{
  startScenario: []
}>()
</script>

<template>
  <div class="w-full h-full">
    <div v-if="!gameStore.isGameInstantiated" class="w-full h-full flex items-center justify-center">
      <NewScenarioButton @startScenario="emit('startScenario')" />
    </div>

    <div v-else-if="!gameStore.hasRules" class="w-full h-full flex items-center justify-center">
      <p class="text-gray-400">Configure game rules in settings to begin...</p>
    </div>

    <div v-else class="w-full h-full overflow-y-auto p-6 space-y-6">
      <div class="mb-2">
        <h2 class="text-2xl font-bold text-white">Technology Status</h2>
      </div>

      <div class="w-1/4 min-w-[320px] p-4">
        <TechTreeChart />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
