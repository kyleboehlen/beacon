<script setup lang="ts">
import { useGameStore } from '@/entities/_game'
import { RulesWizard } from '@/features/rules-wizard'

const gameStore = useGameStore()

const emit = defineEmits<{
  rulesCreated: []
}>()
</script>

<template>
  <div class="w-full h-full p-6 flex flex-col">
    <RulesWizard
      v-if="!gameStore.hasRules"
      @completed="emit('rulesCreated')"
    />
    <div v-else class="text-white">
      <p>Game settings panel with rules configuration goes here.</p>
    </div>
  </div>
</template>