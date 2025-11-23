<script setup lang="ts">
import { ref, watch, onUnmounted } from 'vue'
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

const handleEscape = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && isOpen.value) {
    close()
  }
}

watch(isOpen, (newValue) => {
  // Drawer is opening
  if (newValue && drawerRef.value) {
    // Wait for animations to start before focusing
    setTimeout(() => {
      // Focus the drawer for accessibility
      drawerRef.value?.focus()
      // Create a focus trap to prevent tabbing out of the drawer
      focusTrap = createFocusTrap(drawerRef.value!, {
        initialFocus: drawerRef.value!,
        escapeDeactivates: false,
      })
      focusTrap.activate()
    }, 100)
    // Allow for closing the drawer with Escape key
    document.addEventListener('keydown', handleEscape)
  } else {
    // Remove the focus trap when drawer is closed
    if (focusTrap) {
      focusTrap.deactivate()
      focusTrap = null
    }
    // Remove the Escape key event listener
    document.removeEventListener('keydown', handleEscape)
  }
})

onUnmounted(() => {
  // Clean up any lingering focus traps or event listeners
  if (focusTrap) {
    focusTrap.deactivate()
  }
  document.removeEventListener('keydown', handleEscape)
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
            <button
              @click="close"
              aria-label="Close drawer"
              class="p-2 hover:bg-gray-100 dark:hover:bg-neutral-700 rounded"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div class="flex-1 overflow-y-auto p-4">
            <slot />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
