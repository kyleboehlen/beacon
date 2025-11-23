<script setup lang="ts">
import { ref } from 'vue'

const isOpen = ref(false)

const open = () => {
  isOpen.value = true
}

const close = () => {
  isOpen.value = false
}

defineExpose({ open, close })
</script>

<template>
  <Teleport to="body">
    <Transition name="drawer">
      <div v-if="isOpen" class="fixed inset-0 z-50 flex justify-end">

        <!-- Backdrop -->
        <div class="absolute inset-0 bg-gray-900/50 dark:bg-black/60" @click="close" />

        <!-- Drawer -->
        <div
          class="relative w-1/3 h-full bg-white dark:bg-neutral-800 border-l border-gray-100 dark:border-neutral-700 shadow-md flex flex-col"
        >
          <!-- Header -->
          <div
            class="flex justify-between items-center py-3 px-4 border-b border-gray-100 dark:border-neutral-700"
          >
            <slot name="header">
              <h3 class="font-bold text-gray-800 dark:text-white">Title</h3>
            </slot>
          </div>

          <!-- Content -->
          <div class="flex-1 overflow-y-auto p-4">
            <slot />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.drawer-enter-active,
.drawer-leave-active {
  transition: opacity 0.3s ease;
}

.drawer-enter-active .relative,
.drawer-leave-active .relative {
  transition: transform 0.3s ease;
}

.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;
}

.drawer-enter-from .relative,
.drawer-leave-to .relative {
  transform: translateX(100%);
}
</style>
