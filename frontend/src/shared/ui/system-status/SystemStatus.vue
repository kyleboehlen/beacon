<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { AttentionBadge } from '@/shared/ui/attention-badge'
import { StatusLED } from '@/shared/ui/status-led'

interface Props {
  autoStart?: boolean
  duration?: number
}

const props = withDefaults(defineProps<Props>(), {
  autoStart: true,
  duration: 3,
})

const status = ref<'initializing' | 'online'>('initializing')
const dots = ref(0)
let dotInterval: ReturnType<typeof setInterval> | null = null
let transitionTimeout: ReturnType<typeof setTimeout> | null = null

const startSequence = () => {
  // Clear any existing intervals/timeouts
  if (dotInterval) clearInterval(dotInterval)
  if (transitionTimeout) clearTimeout(transitionTimeout)

  status.value = 'initializing'
  dots.value = 0

  // Animate dots
  dotInterval = setInterval(() => {
    dots.value = (dots.value + 1) % 4
  }, 500)

  // Remove transition and change status
  transitionTimeout = setTimeout(() => {
    if (dotInterval) clearInterval(dotInterval)
    status.value = 'online'
  }, props.duration * 1000)
}

onMounted(() => {
  if (props.autoStart) {
    startSequence()
  }
})

onUnmounted(() => {
  // Clean up intervals/timeouts on unmount
  if (dotInterval) clearInterval(dotInterval)
  if (transitionTimeout) clearTimeout(transitionTimeout)
})

defineExpose({
  startSequence,
})
</script>

<template>
  <div
    class="flex flex-row flex-nowrap items-start gap-3"
    role="status"
    aria-live="polite"
    aria-atomic="true"
  >
    <!-- Status Light -->
    <span class="relative flex items-center justify-center w-4 h-4" aria-hidden="true">
      <!-- Pulsing outer glow (only when initializing) -->
      <AttentionBadge v-if="status === 'initializing'" variant="yellow" />
      <!-- Solid light -->
      <StatusLED v-else variant="green"></StatusLED>
    </span>

    <!-- Status Text -->
    <span class="text-sm font-medium transition-colors duration-500 text-gray-400">
      <template v-if="status === 'initializing'">
        <span class="flex flex-row flex-nowrap items-start">
          <slot name="initializing">Initializing</slot><span>{{ '.'.repeat(dots) }}</span>
        </span>
      </template>
      <template v-else>
        <slot name="online">
          <span class="tracking-wider">Online</span>
        </slot>
      </template>
    </span>
  </div>
</template>

<style scoped></style>
