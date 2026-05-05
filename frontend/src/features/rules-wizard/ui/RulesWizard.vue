<script setup lang="ts">
import { ref } from 'vue'
import { useRulesConfigStore, RulesConfigStatus } from '@/entities/rules'
import { useGameStore } from '@/entities/_game'
import { StepWizard } from '@/shared/ui/step-wizard'
import { SystemStatus } from '@/shared/ui/system-status'
import { useToast } from '@/shared/lib/composables/useToast'
import BasicStep from './steps/BasicStep.vue'
import BeaconStep from './steps/BeaconStep.vue'
import FactionsStep from './steps/FactionsStep.vue'
import OptionalStep from './steps/OptionalStep.vue'
import SummaryStep from './steps/SummaryStep.vue'

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
  { id: 'summary', label: 'Summary' },
]

const fetchDefaultRulesConfig = async (): Promise<boolean> => {
  try {
    // Always pulls fresh defaults from the API — rulesConfigStore is not persisted.
    // This is intentional: the wizard is only mounted when no rules exist on the game yet,
    // so there is no existing config to restore. If this ever mounts with a game that already
    // has rules (e.g. after a page refresh mid-wizard), the user's in-progress changes will
    // be lost and they will start from defaults again.
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
    rulesConfigStore.setStatus(RulesConfigStatus.Active)
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
    <div v-if="isLoading" class="text-white" aria-busy="true">
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
      <template #summary><SummaryStep /></template>
    </StepWizard>
  </div>
</template>
