<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { BasicCard } from '@/shared/ui/basic-card'

const gameStats = {
  round: 42,
  stardate: '2401.127',
  credits: 125780,
  energy: 8920,
  minerals: 4560,
  population: 5590,
}

const formatNumber = (num: number) => {
  return new Intl.NumberFormat('en-US').format(num)
}
</script>

<template>
  <BasicCard title="Game Status" class="h-full w-full">
    <div class="space-y-4">
      <!-- Round and Stardate -->
      <div class="grid grid-cols-2 gap-4">
        <div class="bg-black/20 p-3 rounded border border-white/5">
          <div class="flex items-center gap-2 mb-1">
            <Icon icon="mdi:clock-outline" class="text-blue-400 w-4 h-4" />
            <p class="text-xs text-gray-400 uppercase tracking-wide">Round</p>
          </div>
          <p class="text-2xl font-bold text-white">{{ gameStats.round }}</p>
        </div>

        <div class="bg-black/20 p-3 rounded border border-white/5">
          <div class="flex items-center gap-2 mb-1">
            <Icon icon="mdi:calendar" class="text-purple-400 w-4 h-4" />
            <p class="text-xs text-gray-400 uppercase tracking-wide">Stardate</p>
          </div>
          <p class="text-lg font-bold text-white font-mono">{{ gameStats.stardate }}</p>
        </div>
      </div>

      <!-- Resources -->
      <div class="space-y-2">
        <!-- Credits -->
        <div class="flex items-center justify-between bg-black/20 p-2 rounded border border-white/5">
          <div class="flex items-center gap-2">
            <Icon icon="mdi:currency-usd" class="text-green-400 w-4 h-4" />
            <span class="text-sm text-gray-300">Credits</span>
          </div>
          <span class="text-sm font-semibold text-green-400">
            {{ formatNumber(gameStats.credits) }}
          </span>
        </div>

        <!-- Energy -->
        <div class="flex items-center justify-between bg-black/20 p-2 rounded border border-white/5">
          <div class="flex items-center gap-2">
            <Icon icon="mdi:flash" class="text-yellow-400 w-4 h-4" />
            <span class="text-sm text-gray-300">Energy</span>
          </div>
          <span class="text-sm font-semibold text-yellow-400">
            {{ formatNumber(gameStats.energy) }}
          </span>
        </div>

        <!-- Minerals -->
        <div class="flex items-center justify-between bg-black/20 p-2 rounded border border-white/5">
          <div class="flex items-center gap-2">
            <Icon icon="mdi:cube" class="text-orange-400 w-4 h-4" />
            <span class="text-sm text-gray-300">Minerals</span>
          </div>
          <span class="text-sm font-semibold text-orange-400">
            {{ formatNumber(gameStats.minerals) }}
          </span>
        </div>

        <!-- Population -->
        <div class="flex items-center justify-between bg-black/20 p-2 rounded border border-white/5">
          <div class="flex items-center gap-2">
            <Icon icon="mdi:account-group" class="text-cyan-400 w-4 h-4" />
            <span class="text-sm text-gray-300">Population</span>
          </div>
          <span class="text-sm font-semibold text-cyan-400">
            {{ formatNumber(gameStats.population) }}M
          </span>
        </div>
      </div>
    </div>
  </BasicCard>
</template>

<style scoped></style>
