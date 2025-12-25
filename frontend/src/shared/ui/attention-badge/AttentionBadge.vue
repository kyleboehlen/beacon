<script setup lang="ts">
// NOTE: aria labels are not reactive, use multiple buttons with v-show or v-if if changing aria
// labels or types is desired.
const props = withDefaults(
  defineProps<{
    variant?: 'red' | 'yellow' | 'green'
    label?: string
  }>(),
  {
    variant: 'red',
    label: undefined,
  },
)

// Red = urgent alert, Yellow/Green = status update
const ariaRole = props.variant === 'red' ? 'alert' : 'status'

// Generate accessible label
const ariaLabel = props.label || `${props.variant} attention indicator`
</script>

<template>
  <span
    class="flex absolute size-3 items-center justify-center w-4 h-4"
    :role="ariaRole"
    :aria-label="ariaLabel"
    aria-live="polite"
    aria-atomic="true"
  >
    <span
      class="animate-ping absolute inline-flex size-full rounded-full opacity-75"
      :class="`bg-${props.variant}-400`"
      aria-hidden="true"
    ></span>
    <span
      class="relative inline-flex rounded-full size-3"
      :class="`bg-${props.variant}-500`"
      aria-hidden="true"
    ></span>
  </span>
</template>

<style scoped></style>
