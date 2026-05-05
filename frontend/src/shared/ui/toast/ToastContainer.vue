<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useToast } from '@/shared/lib/composables/useToast'
import ToastItem from './ToastItem.vue'
import type { ToastType } from '@/shared/ui/toast/types.ts'

const toastStore = useToast()
const { toasts } = storeToRefs(toastStore)
const { remove } = toastStore
</script>

<template>
  <Teleport to="body">
    <div
      class="fixed top-4 right-4 z-50 flex flex-col gap-3 max-w-sm"
      aria-label="Notifications"
      role="region"
    >
      <TransitionGroup name="toast">
        <ToastItem
          v-for="toast in toasts"
          :key="toast.id"
          :message="toast.message"
          :type="toast.type as ToastType"
          :dismissible="toast.dismissible"
          @dismiss="remove(toast.id as string)"
        >
          <component :is="toast.component" v-bind="toast.props" />
        </ToastItem>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.toast-move {
  transition: transform 0.3s ease;
}
</style>
