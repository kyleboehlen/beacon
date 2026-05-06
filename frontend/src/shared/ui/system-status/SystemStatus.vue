<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { StatusLED } from '@/shared/ui/status-led'

// This function returns true on success, false on failure, that maps to the Status
interface Props {
  fn: () => Promise<boolean>
}

// By default the Status returns true (success) after a timeout
const props = withDefaults(defineProps<Props>(), {
  fn: () => {
    return new Promise<boolean>((resolve) =>
      setTimeout(() => {
        resolve(true)
      }, 4000),
    )
  },
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
// Dots grow indefinitely — infinite growth is acceptable and expected visually.
// Capped at 10 only to bound memory; they do not cycle back to empty.
let dotsInterval: ReturnType<typeof setInterval> | undefined

const srAnnouncement = ref('')

onMounted(async () => {
  dotsInterval = setInterval(() => {
    if (dots.value.length < 10) dots.value += '.'
  }, 750)

  // Announce initial loading state after the live region has mounted
  await nextTick()
  srAnnouncement.value = 'Loading, please wait'

  try {
    const result = await props.fn()
    status.value = result ? 'success' : 'failed'
    srAnnouncement.value = result ? 'Ready' : 'Failed to load'
  } catch {
    status.value = 'failed'
    srAnnouncement.value = 'Failed to load'
  } finally {
    clearInterval(dotsInterval)
  }
})

onUnmounted(() => {
  if (dotsInterval) {
    clearInterval(dotsInterval)
  }
})
</script>

<template>
  <!-- Visual element — aria-hidden so the growing dots string isn't announced repeatedly -->
  <div
    class="flex flex-row flex-nowrap items-center gap-3"
    aria-hidden="true"
  >
    <StatusLED :variant="statusLEDVariant" aria-hidden="true" />
    <span class="text-gray-400">
      <slot :dots="dots" :status="status">System Status{{ dots }}</slot>
    </span>
  </div>

  <!-- Screen reader live region — announces status changes without the dot noise -->
  <div
    role="status"
    aria-live="polite"
    aria-atomic="true"
    class="sr-only"
  >{{ srAnnouncement }}</div>
</template>

<style scoped></style>