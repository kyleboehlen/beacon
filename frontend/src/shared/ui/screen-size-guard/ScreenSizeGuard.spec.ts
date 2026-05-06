import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import { nextTick } from 'vue'
import ScreenSizeGuard from './ScreenSizeGuard.vue'

function setWindowSize(width: number, height: number) {
  Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: width })
  Object.defineProperty(window, 'innerHeight', { writable: true, configurable: true, value: height })
}

function triggerResize() {
  window.dispatchEvent(new Event('resize'))
}

function guardExists() {
  return document.body.querySelector('[data-testid="screen-size-guard"]') !== null
}

function getGuard() {
  return document.body.querySelector('[data-testid="screen-size-guard"]')
}

describe('ScreenSizeGuard', () => {
  let wrapper: VueWrapper

  afterEach(() => {
    wrapper.unmount()
  })

  describe('supported screen sizes', () => {
    it('is hidden on a wide landscape screen', () => {
      setWindowSize(1440, 900)
      wrapper = mount(ScreenSizeGuard, { attachTo: document.body })
      expect(guardExists()).toBe(false)
    })

    it('is hidden at exactly the minimum width in landscape', () => {
      setWindowSize(1024, 768)
      wrapper = mount(ScreenSizeGuard, { attachTo: document.body })
      expect(guardExists()).toBe(false)
    })
  })

  describe('unsupported screen sizes', () => {
    it('is visible when width is below minimum', async () => {
      setWindowSize(800, 600)
      wrapper = mount(ScreenSizeGuard, { attachTo: document.body })
      await nextTick()
      expect(guardExists()).toBe(true)
    })

    it('is visible in portrait orientation', async () => {
      setWindowSize(1200, 1400)
      wrapper = mount(ScreenSizeGuard, { attachTo: document.body })
      await nextTick()
      expect(guardExists()).toBe(true)
    })

    it('is visible on small mobile screens', async () => {
      setWindowSize(375, 812)
      wrapper = mount(ScreenSizeGuard, { attachTo: document.body })
      await nextTick()
      expect(guardExists()).toBe(true)
    })
  })

  describe('resize handling', () => {
    it('shows overlay when window shrinks below minimum', async () => {
      setWindowSize(1440, 900)
      wrapper = mount(ScreenSizeGuard, { attachTo: document.body })
      expect(guardExists()).toBe(false)

      setWindowSize(800, 600)
      triggerResize()
      await nextTick()

      expect(guardExists()).toBe(true)
    })

    it('hides overlay when window grows to supported size', async () => {
      setWindowSize(800, 600)
      wrapper = mount(ScreenSizeGuard, { attachTo: document.body })
      await nextTick()
      expect(guardExists()).toBe(true)

      setWindowSize(1440, 900)
      triggerResize()
      await nextTick()

      expect(guardExists()).toBe(false)
    })

    it('removes the resize listener on unmount', () => {
      setWindowSize(1440, 900)
      const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener')
      wrapper = mount(ScreenSizeGuard, { attachTo: document.body })
      wrapper.unmount()
      expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function))
      removeEventListenerSpy.mockRestore()
    })
  })

  describe('accessibility', () => {
    beforeEach(() => {
      setWindowSize(375, 812)
      wrapper = mount(ScreenSizeGuard, { attachTo: document.body })
    })

    it('has role="alertdialog"', () => {
      expect(getGuard()?.getAttribute('role')).toBe('alertdialog')
    })

    it('has aria-modal="true"', () => {
      expect(getGuard()?.getAttribute('aria-modal')).toBe('true')
    })

    it('has aria-labelledby pointing to the title', () => {
      const labelledById = getGuard()?.getAttribute('aria-labelledby')
      expect(document.body.querySelector(`#${labelledById}`)).not.toBeNull()
    })

    it('has aria-describedby pointing to the description', () => {
      const describedById = getGuard()?.getAttribute('aria-describedby')
      expect(document.body.querySelector(`#${describedById}`)).not.toBeNull()
    })
  })
})