<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'

interface Props {
  message?: string,
  type: 'success' | 'error' | 'warning' | 'info',
  dismissible?: boolean,
}

const props = withDefaults(defineProps<Props>(), {
  type: 'info',
  dismissible: true,
})
const emit = defineEmits<{
  dismiss: []
}>()

const typeStyles = {
  success: {
    bg: 'bg-green-500/20',
    border: 'border-green-500/50',
    glow: 'shadow-[0_0_15px_rgba(34,197,94,0.6)]',
    icon: 'mdi:check-circle',
    iconColor: 'text-green-400',
  },
  error: {
    bg: 'bg-red-500/20',
    border: 'border-red-500/50',
    glow: 'shadow-[0_0_15px_rgba(239,68,68,0.6)]',
    icon: 'mdi:alert-circle',
    iconColor: 'text-red-400',
  },
  warning: {
    bg: 'bg-yellow-500/20',
    border: 'border-yellow-500/50',
    glow: 'shadow-[0_0_15px_rgba(234,179,8,0.6)]',
    icon: 'mdi:alert',
    iconColor: 'text-yellow-400',
  },
  info: {
    bg: 'bg-white/10',
    border: 'border-white/30',
    glow: 'shadow-[0_0_15px_rgba(255,255,255,0.3)]',
    icon: 'mdi:information',
    iconColor: 'text-white/80',
  },
}

const styles = computed(() => typeStyles[props.type])

const ariaRole = computed(() => (props.type === 'error' ? 'alert' : 'status'))
const ariaLive = computed(() => (props.type === 'error' ? 'assertive' : 'polite'))

const handleDismiss = () => {
  emit('dismiss')
}
</script>

<template>
  <div
    :role="ariaRole"
    :aria-live="ariaLive"
    aria-atomic="true"
    tabindex="-1"
    :class="[
      'flex items-start gap-3 p-4 rounded-lg border backdrop-blur-sm',
      'transition-all duration-300',
      styles.bg,
      styles.border,
      styles.glow,
    ]"
  >
    <Icon :icon="styles.icon" :class="['size-5 flex-shrink-0 mt-0.5', styles.iconColor]" aria-hidden="true" />

    <div class="flex-1 min-w-0">
      <slot>
        <p class="text-white text-sm">{{ props.message }}</p>
      </slot>
    </div>

    <button
      v-if="props.dismissible"
      type="button"
      :class="[
        'flex-shrink-0 p-1 rounded transition-colors duration-200',
        'hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white',
      ]"
      aria-label="Close notification"
      @click="handleDismiss"
    >
      <Icon icon="mdi:close" class="size-4 text-white/60 hover:text-white" aria-hidden="true" />
      <span class="sr-only">Close</span>
    </button>
  </div>
</template>

<style scoped></style>
