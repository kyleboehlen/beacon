import type { Component } from 'vue'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

export interface Toast {
  id?: string
  type?: ToastType
  message?: string
  duration?: number
  dismissible?: boolean
  component?: Component
  props?: Record<string, unknown>
}
