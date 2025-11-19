<script setup lang="ts">
import { StarryBackground } from '@/shared/ui/starry-background'
</script>

<template>
  <div class="relative w-full h-screen">
    <StarryBackground class="w-full h-screen absolute" />
    <div class="relative w-full h-full flex flex-col justify-center items-center">
      <span class="text-white/90 font-bruno text-9xl">B.E.A.C.O.N.</span>
      <span class="text-white/80 mt-4 text-xl">Press any button to continue...</span>
    </div>
  </div>
</template>

<style scoped></style>
