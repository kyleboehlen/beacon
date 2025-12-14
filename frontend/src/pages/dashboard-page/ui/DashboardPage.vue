<script setup lang="ts">
import { StarryBackground } from '@/shared/ui/starry-background'
import { useHealthCheck } from '@/entities/health-check'
import { FullDashboardWidget } from '@/widgets/full-dashboard-widget'

const { consoleLogHealthStatus } = useHealthCheck()
consoleLogHealthStatus()
</script>

<template>
  <!-- TODO: add screen size not supported feature -->
  <StarryBackground class="w-full h-screen">
    <FullDashboardWidget />
  </StarryBackground>
</template>
