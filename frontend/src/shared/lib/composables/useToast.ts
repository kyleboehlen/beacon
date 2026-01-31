import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Toast } from '@/shared/ui/toast/types'

export const useToast = defineStore('toast', () => {
  // State
  const toasts = ref<Toast[]>([])
  const DEFAULT_DURATION = 5000 // in milliseconds

  // Actions
  function add(toast: Toast) {
    toast.id = toast.id ?? crypto.randomUUID()
    toast.duration = toast.duration ?? DEFAULT_DURATION

    toasts.value.push(toast)

    if (toast.duration > 0) {
      setTimeout(() => remove(toast.id as string), toast.duration)
    }
  }

  function remove(id: string): void {
    const index = toasts.value.findIndex((t) => t.id === id)
    if (index > -1) toasts.value.splice(index, 1)
  }

  function clear(): void {
    toasts.value = []
  }

  // Convenience methods
  const success = (message: string) =>
    add({ message, type: 'success' })
  const error = (message: string) =>
    add({ message, type: 'error' })
  const warning = (message: string) =>
    add({ message, type: 'warning' })
  const info = (message: string) =>
    add({ message, type: 'info' })

  return { toasts, add, remove, clear, success, error, warning, info }
})
