<script setup lang="ts">
defineProps<{
  title?: string
}>()
</script>

<template>
  <div class="bg-white/5 border border-white/10 p-6 rounded-lg">
    <h3 v-if="title || $slots.title" class="text-lg font-semibold text-white mb-4">
      <slot name="title">{{ title }}</slot>
    </h3>
    <slot />
  </div>
</template>

<style scoped></style>
