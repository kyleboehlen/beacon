<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const dots = ref('...')
let interval: NodeJS.Timeout | null = null

onMounted(() => {
  const patterns = ['.', '..', '...']
  let index = 0

  interval = setInterval(() => {
    index = (index + 1) % patterns.length
    dots.value = patterns[index]
  }, 500) // Change every 500ms
})

onUnmounted(() => {
  if (interval) {
    clearInterval(interval)
  }
})
</script>

<template>
<p><slot />{{ dots }}</p>
</template>

<style scoped>

</style>
