<script setup lang="ts">
import { useGameStore } from '@/entities/_game'
import NewScenarioButton from '@/features/dashboard-panel/ui/NewScenarioButton.vue'
import FleetCompositionChart from '@/features/dashboard-panel/ui/FleetCompositionChart.vue'
import ColonyGrowthChart from '@/features/dashboard-panel/ui/ColonyGrowthChart.vue'
import TechnologyRadarChart from '@/features/dashboard-panel/ui/TechnologyRadarChart.vue'
import GameStatusCard from '@/features/dashboard-panel/ui/GameStatusCard.vue'
import MissionDataTable from '@/features/dashboard-panel/ui/MissionDataTable.vue'

const gameStore = useGameStore()

const emit = defineEmits<{
  startScenario: []
}>()

const handleInitiateGame = () => {
  emit('startScenario')
}
</script>

<template>
  <div class="w-full h-full">
    <!-- Show new scenario button when no game exists -->
    <div v-if="!gameStore.isGameInstantiated" class="w-full h-full flex items-center justify-center">
      <NewScenarioButton @startScenario="handleInitiateGame" />
    </div>

    <!-- Show message when game exists but rules don't -->
    <div
      v-else-if="!gameStore.hasRules"
      class="w-full h-full flex items-center justify-center text-white"
    >
      <p class="text-gray-400">Configure game rules in settings to begin...</p>
    </div>

    <!-- Show dashboard content when rules exist -->
    <div v-else class="w-full h-full overflow-y-auto p-6 space-y-6">
      <!-- Header -->
      <div class="mb-6">
        <h2 class="text-2xl font-bold text-white">Command Dashboard</h2>
        <p class="text-gray-400 mt-1">Overview of your galactic operations</p>
      </div>

      <!-- Charts Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div class="md:col-span-2 xl:col-span-1 min-h-100">
          <FleetCompositionChart />
        </div>
        <div class="md:col-span-2 xl:col-span-2">
          <ColonyGrowthChart />
        </div>
        <div class="md:col-span-1 xl:col-span-1">
          <TechnologyRadarChart />
        </div>
        <div class="md:col-span-1 xl:col-span-1">
          <GameStatusCard />
        </div>
      </div>

      <!-- Data Table -->
      <MissionDataTable />
    </div>
  </div>
</template>

<style scoped></style>
