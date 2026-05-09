<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  variant?: 'default' | 'cyan' | 'green' | 'yellow' | 'red'
  label?: string
}>(), {
  variant: 'default',
  label: undefined,
})

const variantClasses = computed(() => ({
  default: 'border-white/40 text-white/80 [filter:drop-shadow(0_0_6px_rgb(255_255_255/0.25))]',
  cyan:    'border-cyan-500 text-cyan-400 [filter:drop-shadow(0_0_6px_rgb(6_182_212/0.5))]',
  green:   'border-green-500 text-green-400 [filter:drop-shadow(0_0_6px_rgb(34_197_94/0.5))]',
  yellow:  'border-yellow-500 text-yellow-400 [filter:drop-shadow(0_0_6px_rgb(234_179_8/0.5))]',
  red:     'border-red-500 text-red-400 [filter:drop-shadow(0_0_6px_rgb(239_68_68/0.5))]',
}[props.variant]))
</script>

<template>
  <span
    class="inline-flex items-center gap-x-1.5 pb-1.5 pt-2 px-3 rounded-full text-xs font-medium border leading-none"
    :class="variantClasses"
    :aria-label="label"
  >
    <slot />
  </span>
</template>

<style scoped></style>
