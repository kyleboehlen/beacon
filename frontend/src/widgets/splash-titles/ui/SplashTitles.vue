<script setup lang="ts">
import { StarryBackground } from '@/shared/ui/starry-background'
import { Icon } from '@iconify/vue'
import { onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const handleKeyPress = (event: KeyboardEvent) => {
  // Ignore modifier-only keys
  if (
    event.key === 'Shift' ||
    event.key === 'Control' ||
    event.key === 'Alt' ||
    event.key === 'Meta'
  ) {
    return
  }
  // Navigate to the dashboard view (HomePage)
  router.push('/dashboard')
}

const handleClick = () => {
  router.push('/dashboard')
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyPress)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyPress)
})
</script>

<template>
  <div class="relative w-full h-screen">
    <StarryBackground class="w-full h-screen absolute" />
    <div class="relative w-full h-full flex flex-col justify-start items-center pt-[20vh]">
      <Icon
        icon="streamline-ultimate:space-rocket-earth-bold"
        class="text-white w-[10%] h-auto"
        aria-hidden="true"
      />
      <span class="text-white/90 font-[BrunoAce] text-9xl">B.E.A.C.O.N.</span>
      <button
        @click="handleClick"
        class="text-white/80 mt-4 text-xl hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 px-6 py-3 rounded hover:cursor-pointer"
      >
        Press any key or click to continue...
      </button>
    </div>
  </div>
</template>

<style scoped></style>
