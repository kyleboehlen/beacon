<script setup lang="ts">
import { ref, watch, onUnmounted, nextTick } from 'vue'
import { createFocusTrap } from 'focus-trap'
import type { FocusTrap } from 'focus-trap'

const isOpen = ref(false)
const drawerRef = ref<HTMLElement | null>(null)
const triggerElement = ref<HTMLElement | null>(null)
let focusTrap: FocusTrap | null = null

const props = withDefaults(
  defineProps<{
    // Optional ID for the drawer header for accessibility
    headerId?: string
  }>(),
  {
    headerId: 'drawer-header',
  },
)

const open = () => {
  triggerElement.value = document.activeElement as HTMLElement
  isOpen.value = true
  // Prevent background scrolling when drawer is open
  document.body.style.overflow = 'hidden'
}

const close = () => {
  isOpen.value = false
  // Restore background scrolling when drawer is closed
  document.body.style.overflow = ''
  triggerElement.value?.focus()
}

watch(isOpen, (newValue) => {
  // Drawer is opening
  if (newValue && drawerRef.value) {
    // Wait for animations to start before focusing
    nextTick(() => {
      // Focus the drawer for accessibility
      drawerRef.value?.focus()
      // Create a focus trap to prevent tabbing out of the drawer
      // Let focus-trap handle Escape key to close the drawer
      focusTrap = createFocusTrap(drawerRef.value!, {
        initialFocus: drawerRef.value!,
        escapeDeactivates: true,
        onDeactivate: () => {
          close()
        },
      })
      focusTrap.activate()
    }, 100)
  } else {
    // Remove the focus trap when drawer is closed
    if (focusTrap) {
      focusTrap.deactivate()
      focusTrap = null
    }
  }
})

onUnmounted(() => {
  // Clean up any lingering focus traps or event listeners
  if (focusTrap) {
    focusTrap.deactivate()
  }
  // Restore background scrolling
  document.body.style.overflow = ''
})

defineExpose({ open, close })
</script>

<template>
  <Teleport to="body">
    <div role="status" aria-live="polite" aria-atomic="true" class="sr-only">
      {{ isOpen ? 'Drawer opened' : '' }}
    </div>

    <Transition name="drawer">
      <div v-if="isOpen" class="fixed inset-0 z-50 flex justify-end">
        <div class="absolute inset-0 bg-gray-900/50 dark:bg-black/60" @click="close" />

        <div
          ref="drawerRef"
          role="dialog"
          aria-modal="true"
          :aria-labelledby="props.headerId"
          tabindex="-1"
          class="relative w-1/3 h-full bg-white dark:bg-neutral-800 border-l border-gray-100 dark:border-neutral-700 shadow-md flex flex-col"
        >
          <div
            class="flex justify-between items-center py-3 px-4 border-b border-gray-100 dark:border-neutral-700"
          >
            <slot name="header">
              <h3 :id="props.headerId" class="font-bold text-gray-800 dark:text-white">Title</h3>
            </slot>
          </div>

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
  transition: opacity 300ms ease;
}

.drawer-enter-active .relative,
.drawer-leave-active .relative {
  transition: transform 300ms ease;
}

.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;
}

.drawer-enter-from .relative {
  transform: translateX(100%);
}

.drawer-leave-to .relative {
  transform: translateX(100%);
}

.drawer-enter-to,
.drawer-leave-from {
  opacity: 1;
}

.drawer-enter-to .relative,
.drawer-leave-from .relative {
  transform: translateX(0);
}
</style>
