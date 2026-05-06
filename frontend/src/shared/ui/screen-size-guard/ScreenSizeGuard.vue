<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { StarryBackground } from '@/shared/ui/starry-background'
import { Icon } from '@iconify/vue'

const MIN_WIDTH = 1024

const isUnsupported = ref(false)

function checkScreenSize() {
  isUnsupported.value = window.innerWidth < MIN_WIDTH || window.innerHeight > window.innerWidth
}

onMounted(() => {
  checkScreenSize()
  window.addEventListener('resize', checkScreenSize)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkScreenSize)
})
</script>

<template>
  <Teleport to="body">
    <div
      v-if="isUnsupported"
      data-testid="screen-size-guard"
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="screen-size-guard-title"
      aria-describedby="screen-size-guard-description"
      class="fixed inset-0 z-[9999]"
    >
      <StarryBackground class="w-full h-full flex flex-col items-center justify-center gap-6 text-center px-8">
        <Icon
          icon="mdi:monitor-off"
          class="text-white/60 w-16 h-16"
          aria-hidden="true"
        />
        <h1
          id="screen-size-guard-title"
          class="text-white font-[BrunoAce] text-4xl"
        >
          Screen Size Not Supported
        </h1>
        <p
          id="screen-size-guard-description"
          class="text-white/60 text-lg max-w-md"
        >
          B.E.A.C.O.N. requires a landscape display at least 1024px wide.
          Please rotate your device or use a larger screen.
        </p>
      </StarryBackground>
    </div>
  </Teleport>
</template>
