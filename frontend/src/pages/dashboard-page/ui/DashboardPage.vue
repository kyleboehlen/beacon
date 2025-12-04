<script setup lang="ts">
import { StarryBackground } from '@/shared/ui/starry-background'
import { useHealthCheck } from '@/entities/health-check'
import DashboardChrome from '@/widgets/dashboard-chrome/DashboardChrome.vue'

const { consoleLogHealthStatus } = useHealthCheck()
consoleLogHealthStatus()
</script>

<template>
  <StarryBackground class="w-full h-screen" />

    <DashboardChrome>
<!--      <GameOverview />-->
    </DashboardChrome>
</template>
