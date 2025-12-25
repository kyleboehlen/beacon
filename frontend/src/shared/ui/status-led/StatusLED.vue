<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    variant?: 'red' | 'yellow' | 'green'
  }>(),
  {
    variant: 'green'
  },
)

const variantClasses = {
  red: 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.9)]',
  yellow: 'bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.9)]',
  green: 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.9)]',
}
</script>

<template>
  <span
    class="inline-flex rounded-full opacity-95 transition-all duration-300 size-3"
    :class="variantClasses[props.variant]"
    role="status"
    :aria-label="`${props.variant} status indicator`"
  ></span>
</template>

<style scoped></style>
