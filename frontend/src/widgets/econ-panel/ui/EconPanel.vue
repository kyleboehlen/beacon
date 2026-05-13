<script setup lang="ts">
import { useGameStore } from '@/entities/_game'

const gameStore = useGameStore()
</script>

<template>
  <section class="w-full h-full overflow-y-auto p-6">
    <div class="flex items-center justify-end">
      <button
        id="econ-new-round-button"
        type="button"
        class="px-4 py-2 rounded-md border border-white/20 bg-white/10 text-white hover:bg-white/15 transition-colors"
        @click="gameStore.econ.createNewRound()"
      >
        New Econ Round
      </button>
    </div>
  </section>
</template>

<style scoped></style>
