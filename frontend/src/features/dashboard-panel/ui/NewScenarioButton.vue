<script setup lang="ts">
import { BasicButton } from '@/shared/ui/basic-button'
import { SystemStatus } from '@/shared/ui/system-status'
const emit = defineEmits(['startScenario'])
</script>

<template>
  <div class="flex flex-col items-center gap-6">
    <h2 class="text-2xl font-bold text-white">Welcome Admiral</h2>
    <SystemStatus>
      <template #initializing>
        <p class="text-gray-400">Initializing</p>
      </template>
      <template #online>
        <p class="text-gray-400">B.E.A.C.O.N. system online and functional</p>
      </template>
    </SystemStatus>
    <BasicButton class="w-64 h-16" id="new-scenario-button" @click="emit('startScenario')">
      <p>Initiate New Scenario</p>
    </BasicButton>
  </div>
</template>

<style scoped></style>
