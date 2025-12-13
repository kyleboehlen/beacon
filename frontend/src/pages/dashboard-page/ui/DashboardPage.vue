<script setup lang="ts">
import { StarryBackground } from '@/shared/ui/starry-background'
import { useHealthCheck } from '@/entities/health-check'
import ContainerChrome from '@/shared/ui/container-chrome/ContainerChrome.vue'

const { consoleLogHealthStatus } = useHealthCheck()
consoleLogHealthStatus()
</script>

<template>
  <StarryBackground class="w-full h-screen" />

    <ContainerChrome>
<!--      <GameOverview />-->
    </ContainerChrome>
</template>
