import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import SystemStatus from './SystemStatus.vue'

describe('SystemStatus', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('Dots appending', () => {
    it('adds dots over time', async () => {
      const fn = () => new Promise<boolean>((resolve) => setTimeout(() => resolve(true), 10000))

      const wrapper = mount(SystemStatus, {
        props: { fn },
      })

      // Initially no dots
      expect(wrapper.text()).not.toContain('...')

      // After 750ms: one dot
      await vi.advanceTimersByTimeAsync(750)
      expect(wrapper.text()).toContain('.')

      // After 1500ms: two dots
      await vi.advanceTimersByTimeAsync(750)
      expect(wrapper.text()).toContain('..')

      // After 2250ms: three dots
      await vi.advanceTimersByTimeAsync(750)
      expect(wrapper.text()).toContain('...')

      wrapper.unmount()
    })

    it('continues adding dots beyond three', async () => {
      const fn = () => new Promise<boolean>((resolve) => setTimeout(() => resolve(true), 10000))

      const wrapper = mount(SystemStatus, {
        props: { fn },
      })

      // Advance to 4 dots (4 x 750ms = 3000ms)
      await vi.advanceTimersByTimeAsync(3000)
      expect(wrapper.text()).toContain('....')

      wrapper.unmount()
    })

    it('stops dots when fn resolves', async () => {
      const fn = () => new Promise<boolean>((resolve) => setTimeout(() => resolve(true), 1500))

      const wrapper = mount(SystemStatus, {
        props: { fn },
      })

      // Advance past fn resolution
      await vi.advanceTimersByTimeAsync(1500)
      await wrapper.vm.$nextTick()

      const dotsAtResolve = wrapper.text()

      // Advance more time — dots should not grow
      await vi.advanceTimersByTimeAsync(1500)
      expect(wrapper.text()).toBe(dotsAtResolve)

      wrapper.unmount()
    })
  })

  describe('Status transitions', () => {
    it('starts with pending status', () => {
      const fn = () => new Promise<boolean>((resolve) => setTimeout(() => resolve(true), 10000))

      const wrapper = mount(SystemStatus, {
        props: { fn },
      })

      const statusLED = wrapper.findComponent({ name: 'StatusLED' })
      expect(statusLED.props('variant')).toBe('yellow')

      wrapper.unmount()
    })

    it('transitions to success on resolve(true)', async () => {
      const fn = () => new Promise<boolean>((resolve) => setTimeout(() => resolve(true), 1000))

      const wrapper = mount(SystemStatus, {
        props: { fn },
      })

      await vi.advanceTimersByTimeAsync(1000)
      await wrapper.vm.$nextTick()

      const statusLED = wrapper.findComponent({ name: 'StatusLED' })
      expect(statusLED.props('variant')).toBe('green')

      wrapper.unmount()
    })

    it('transitions to failed on resolve(false)', async () => {
      const fn = () => new Promise<boolean>((resolve) => setTimeout(() => resolve(false), 1000))

      const wrapper = mount(SystemStatus, {
        props: { fn },
      })

      await vi.advanceTimersByTimeAsync(1000)
      await wrapper.vm.$nextTick()

      const statusLED = wrapper.findComponent({ name: 'StatusLED' })
      expect(statusLED.props('variant')).toBe('red')

      wrapper.unmount()
    })
  })

  describe('Accessibility', () => {
    it('has role="status" on sr-only live region', () => {
      const fn = () => new Promise<boolean>((resolve) => setTimeout(() => resolve(true), 10000))

      const wrapper = mount(SystemStatus, {
        props: { fn },
      })

      const liveRegion = wrapper.find('.sr-only[role="status"]')
      expect(liveRegion.exists()).toBe(true)

      wrapper.unmount()
    })

    it('has aria-live="polite" on sr-only live region', () => {
      const fn = () => new Promise<boolean>((resolve) => setTimeout(() => resolve(true), 10000))

      const wrapper = mount(SystemStatus, {
        props: { fn },
      })

      const liveRegion = wrapper.find('[role="status"]')
      expect(liveRegion.attributes('aria-live')).toBe('polite')

      wrapper.unmount()
    })
  })
})