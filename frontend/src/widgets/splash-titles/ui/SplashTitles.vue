<script setup lang="ts">
import { StarryBackground } from '@/shared/ui/starry-background'
import { Icon } from '@iconify/vue'
</script>

<template>
  <div class="relative w-full h-screen">
    <StarryBackground class="w-full h-screen absolute" />
    <div class="relative w-full h-full flex flex-col justify-start items-center pt-[20vh]">
      <Icon icon="streamline-ultimate:space-rocket-earth-bold" class="text-white w-1/10 h-auto" />
      <span class="text-white/90 font-[BrunoAce] text-9xl">B.E.A.C.O.N.</span>
      <span class="text-white/80 mt-4 text-xl">Press any button to continue...</span>
    </div>
  </div>
</template>

<style scoped></style>
