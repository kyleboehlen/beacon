<script setup lang="ts">
import { ref, computed } from 'vue'
import { BasicButton } from '@/shared/ui/basic-button'
import { SystemStatus } from '@/shared/ui/system-status'

const emit = defineEmits(['startScenario'])

const beaconReady = ref(false)
const loadingReady = ref(false)
const buttonEnabled = computed(() => beaconReady.value && loadingReady.value)

const checkBeaconStatus = (): Promise<boolean> => {
  return new Promise(resolve => setTimeout(() => {
    beaconReady.value = true
    resolve(true)
  }, 2500))
}

const checkLoadingStatus = (): Promise<boolean> => {
  return new Promise(resolve => setTimeout(() => {
    loadingReady.value = true
    resolve(false)
  }, 4000))
}
</script>

<template>
  <div class="flex flex-col items-center gap-6">
    <h2 class="text-3xl font-bold text-white">Welcome Admiral</h2>
    <div class="flex flex-col gap-2 text-left w-full">
      <SystemStatus :fn="checkBeaconStatus" v-slot="{ dots, status }">
        B.E.A.C.O.N. status{{ dots }} {{ status === 'success' ? ' online' : '' }}
      </SystemStatus>
      <SystemStatus :fn="checkLoadingStatus" v-slot="{ dots, status }">
        Loading{{ dots }}{{ status === 'failed' ? ' no scenario found' : '' }}
      </SystemStatus>
    </div>
    <BasicButton
      class="w-64 h-16"
      id="new-scenario-button"
      :disabled="!buttonEnabled"
      @click="emit('startScenario')"
    >
      <p>Initiate New Scenario</p>
    </BasicButton>
  </div>
</template>

<style scoped></style>
