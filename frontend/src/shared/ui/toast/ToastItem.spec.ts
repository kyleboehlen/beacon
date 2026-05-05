import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ToastItem from './ToastItem.vue'

describe('ToastItem', () => {
  it('renders message correctly', () => {
    const wrapper = mount(ToastItem, {
      props: { message: 'Hello World', type: 'info' },
    })

    expect(wrapper.text()).toContain('Hello World')
  })

  it('renders correct icon for success type', () => {
    const wrapper = mount(ToastItem, {
      props: { type: 'success' },
    })

    const icon = wrapper.find('[aria-hidden="true"]')
    expect(icon.exists()).toBe(true)
    expect(wrapper.html()).toContain('text-green-400')
  })

  it('renders correct icon for error type', () => {
    const wrapper = mount(ToastItem, {
      props: { type: 'error' },
    })

    expect(wrapper.html()).toContain('text-red-400')
  })

  it('renders correct icon for warning type', () => {
    const wrapper = mount(ToastItem, {
      props: { type: 'warning' },
    })

    expect(wrapper.html()).toContain('text-yellow-400')
  })

  it('renders correct icon for info type', () => {
    const wrapper = mount(ToastItem, {
      props: { type: 'info' },
    })

    expect(wrapper.html()).toContain('text-white/80')
  })

  it('applies correct styling for success type', () => {
    const wrapper = mount(ToastItem, {
      props: { type: 'success' },
    })

    expect(wrapper.html()).toContain('bg-green-500/20')
    expect(wrapper.html()).toContain('border-green-500/50')
  })

  it('applies correct styling for error type', () => {
    const wrapper = mount(ToastItem, {
      props: { type: 'error' },
    })

    expect(wrapper.html()).toContain('bg-red-500/20')
    expect(wrapper.html()).toContain('border-red-500/50')
  })

  it('applies correct styling for warning type', () => {
    const wrapper = mount(ToastItem, {
      props: { type: 'warning' },
    })

    expect(wrapper.html()).toContain('bg-yellow-500/20')
    expect(wrapper.html()).toContain('border-yellow-500/50')
  })

  it('applies correct styling for info type', () => {
    const wrapper = mount(ToastItem, {
      props: { type: 'info' },
    })

    expect(wrapper.html()).toContain('bg-white/10')
    expect(wrapper.html()).toContain('border-white/30')
  })

  it('emits dismiss event on close button click', async () => {
    const wrapper = mount(ToastItem, {
      props: { type: 'info', dismissible: true },
    })

    const closeButton = wrapper.find('button')
    await closeButton.trigger('click')

    expect(wrapper.emitted('dismiss')).toBeTruthy()
    expect(wrapper.emitted('dismiss')?.length).toBe(1)
  })

  it('does not render close button when not dismissible', () => {
    const wrapper = mount(ToastItem, {
      props: { type: 'info', dismissible: false },
    })

    const closeButton = wrapper.find('button')
    expect(closeButton.exists()).toBe(false)
  })

  it('has role="alert" for error type', () => {
    const wrapper = mount(ToastItem, {
      props: { type: 'error' },
    })

    expect(wrapper.attributes('role')).toBe('alert')
  })

  it('has role="status" for non-error types', () => {
    const types = ['success', 'warning', 'info'] as const
    for (const type of types) {
      const wrapper = mount(ToastItem, {
        props: { type },
      })

      expect(wrapper.attributes('role')).toBe('status')
    }
  })

  it('has aria-live="assertive" for error type', () => {
    const wrapper = mount(ToastItem, {
      props: { type: 'error' },
    })

    expect(wrapper.attributes('aria-live')).toBe('assertive')
  })

  it('has aria-live="polite" for non-error types', () => {
    const types = ['success', 'warning', 'info'] as const
    for (const type of types) {
      const wrapper = mount(ToastItem, {
        props: { type },
      })

      expect(wrapper.attributes('aria-live')).toBe('polite')
    }
  })

  it('has aria-atomic="true"', () => {
    const wrapper = mount(ToastItem, {
      props: { type: 'info' },
    })

    expect(wrapper.attributes('aria-atomic')).toBe('true')
  })

  it('has tabindex="-1" for programmatic focus', () => {
    const wrapper = mount(ToastItem, {
      props: { type: 'info' },
    })

    expect(wrapper.attributes('tabindex')).toBe('-1')
  })

  it('close button has aria-label', () => {
    const wrapper = mount(ToastItem, {
      props: { type: 'info', dismissible: true },
    })

    const closeButton = wrapper.find('button')
    expect(closeButton.attributes('aria-label')).toBe('Close notification')
  })

  it('close button has sr-only text', () => {
    const wrapper = mount(ToastItem, {
      props: { type: 'info', dismissible: true },
    })

    const srOnly = wrapper.find('.sr-only')
    expect(srOnly.exists()).toBe(true)
    expect(srOnly.text()).toBe('Close')
  })

  it('renders slot content when provided', () => {
    const wrapper = mount(ToastItem, {
      props: { type: 'success' },
      slots: {
        default: '<span class="custom-content">Custom Toast Content</span>',
      },
    })

    expect(wrapper.find('.custom-content').exists()).toBe(true)
    expect(wrapper.text()).toContain('Custom Toast Content')
  })

  it('defaults to dismissible true', () => {
    const wrapper = mount(ToastItem, {
      props: { type: 'info' },
    })

    const closeButton = wrapper.find('button')
    expect(closeButton.exists()).toBe(true)
  })

  it('defaults to type info', () => {
    const wrapper = mount(ToastItem, {
      props: {},
    })

    expect(wrapper.html()).toContain('bg-white/10')
    expect(wrapper.html()).toContain('border-white/30')
  })
})