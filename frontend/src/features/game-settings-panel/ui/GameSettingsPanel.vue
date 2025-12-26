<script setup lang="ts">
import { useGameStore } from '@/entities/_game'
import { BasicButton } from '@/shared/ui/basic-button'

const gameStore = useGameStore()

const emit = defineEmits<{
  rulesCreated: []
}>()

const handleCreateRules = () => {
  gameStore.createRules()
  emit('rulesCreated')
}
</script>

<template>
  <div class="w-full h-full flex items-center justify-center">
    <BasicButton
      v-if="!gameStore.hasRules"
      id="button-create-rules"
      type="button"
      @click="handleCreateRules"
    >
      Create Rules
    </BasicButton>
    <div v-else class="text-white">
      <p>Game settings panel with rules configuration goes here.</p>
    </div>
  </div>
</template>

<style scoped></style>
