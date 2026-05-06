<script setup lang="ts">
import { ToastContainer } from '@/shared/ui/toast'
import { ScreenSizeGuard } from '@/shared/ui/screen-size-guard'
</script>

<template>
  <RouterView />
  <ToastContainer />
  <ScreenSizeGuard />
</template>
