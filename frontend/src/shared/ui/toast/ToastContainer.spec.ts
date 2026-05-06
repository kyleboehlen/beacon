import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import ToastContainer from './ToastContainer.vue'
import { useToast } from '@/shared/lib/composables/useToast'

describe('ToastContainer', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    document.body.innerHTML = ''
  })

  it('renders one ToastItem per toast in the store', async () => {
    const wrapper = mount(ToastContainer, { attachTo: document.body })
    const toast = useToast()
    toast.add({ message: 'First', type: 'info', duration: 0 })
    toast.add({ message: 'Second', type: 'error', duration: 0 })
    await wrapper.vm.$nextTick()

    expect(wrapper.findAllComponents({ name: 'ToastItem' })).toHaveLength(2)
    wrapper.unmount()
  })

  it('removes the toast from the store when a ToastItem dismiss button is clicked', async () => {
    const wrapper = mount(ToastContainer, { attachTo: document.body })
    const toast = useToast()
    toast.add({ id: 'test-1', message: 'Dismissible', type: 'info', dismissible: true, duration: 0 })
    await wrapper.vm.$nextTick()

    const dismissButton = document.querySelector('button[aria-label="Close notification"]') as HTMLElement
    dismissButton.click()
    await wrapper.vm.$nextTick()

    expect(toast.toasts).toHaveLength(0)
    wrapper.unmount()
  })
})