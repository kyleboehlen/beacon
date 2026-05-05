<script setup lang="ts">
import { ref } from 'vue'
import { useRulesConfigStore } from '@/entities/rules'
import { useGameStore } from '@/entities/_game'
import { StepWizard } from '@/shared/ui/step-wizard'
import { SystemStatus } from '@/shared/ui/system-status'
import { useToast } from '@/shared/lib/composables/useToast'
import BasicStep from './steps/BasicStep.vue'
import BeaconStep from './steps/BeaconStep.vue'
import FactionsStep from './steps/FactionsStep.vue'
import OptionalStep from './steps/OptionalStep.vue'

const emit = defineEmits<{ completed: [] }>()

const rulesConfigStore = useRulesConfigStore()
const gameStore = useGameStore()
const toast = useToast()

const isLoading = ref(true)

const steps = [
  { id: 'basic', label: 'Basic' },
  { id: 'beacon', label: 'Beacon' },
  { id: 'factions', label: 'Factions' },
  { id: 'optional', label: 'Optional' },
]

const fetchDefaultRulesConfig = async (): Promise<boolean> => {
  try {
    await rulesConfigStore.hydrateDefaults()
    return true
  } catch {
    toast.error('Failed to load rules configuration')
    return false
  } finally {
    isLoading.value = false
  }
}

const handleCompleted = async () => {
  try {
    await rulesConfigStore.saveRulesConfig()
    gameStore.embedRulesConfig(rulesConfigStore.rulesConfig!)
    emit('completed')
  } catch {
    toast.error('Failed to save rules configuration. Please try again.')
  }
}
</script>

<template>
  <div class="w-full h-full flex items-center justify-center">
    <div v-if="isLoading" class="text-white">
      <SystemStatus :fn="fetchDefaultRulesConfig" v-slot="{ dots }">
        Loading rules configuration{{ dots }}
      </SystemStatus>
    </div>

    <StepWizard
      v-else
      :steps="steps"
      class="w-full h-full"
      @completed="handleCompleted"
    >
      <template #basic><BasicStep /></template>
      <template #beacon><BeaconStep /></template>
      <template #factions><FactionsStep /></template>
      <template #optional><OptionalStep /></template>
    </StepWizard>
  </div>
</template>
