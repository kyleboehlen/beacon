<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { StatusLED } from '@/shared/ui/status-led'

interface Props {
  fn: () => Promise<boolean>
}

const props = withDefaults(defineProps<Props>(), {
  fn: () => {
    return new Promise<boolean>(resolve => setTimeout(() => {
      resolve(true)
    }, 4000));
  }
})

type Status = 'pending' | 'success' | 'failed'
type StatusColor = 'yellow' | 'green' | 'red'

const StatusMap = new Map<Status, StatusColor>([
  ['pending', 'yellow'],
  ['success', 'green'],
  ['failed', 'red'],
])

const status = ref<Status>('pending')
const statusLEDVariant = computed(() => {
  return StatusMap.get(status.value)
})

const dots = ref('')
let dotsInterval: ReturnType<typeof setInterval> | undefined

onMounted(async () => {
  dotsInterval = setInterval(() => {
    dots.value += '.'
  }, 750)

  const result = await props.fn()
  clearInterval(dotsInterval)
  status.value = result ? 'success' : 'failed'
})

onUnmounted(() => {
  if (dotsInterval) {
    clearInterval(dotsInterval)
  }
})
</script>

<template>
  <div
    class="flex flex-row flex-nowrap items-center gap-3"
    role="status"
    aria-live="polite"
    aria-atomic="true"
  >
    <StatusLED
      :variant="statusLEDVariant"
      aria-hidden="true"
    />
    <span class="text-gray-400">
      <slot :dots="dots" :status="status">System Status{{ dots }}</slot>
    </span>
  </div>
</template>

<style scoped></style>
