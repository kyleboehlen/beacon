<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    variant?: 'red' | 'green'
  }>(),
  {
    variant: 'red',
  },
)
</script>

<template>
  <span class="flex absolute size-3 items-center justify-center w-4 h-4">
    <span
      class="animate-ping absolute inline-flex size-full rounded-full  opacity-75"
      :class="[props.variant === 'red' ? 'bg-red-400' : 'bg-green-400']"
    ></span>
    <span
      class="relative inline-flex rounded-full size-3"
      :class="[props.variant === 'red' ? 'bg-red-500' : 'bg-green-500']"
    ></span>
  </span>
</template>

<style scoped></style>
