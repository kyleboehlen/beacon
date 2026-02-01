import { describe, it, expect, beforeEach } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import InfoPanel from './InfoPanel.vue'

describe('InfoPanel', () => {
  let wrapper: VueWrapper

  beforeEach(() => {
    wrapper = mount(InfoPanel, {
      props: { modelValue: false, 'onUpdate:modelValue': (v: boolean) => wrapper.setProps({ modelValue: v }) },
    })
  })

  describe('Toggle behavior', () => {
    it('opens the panel when the toggle button is clicked', async () => {
      await wrapper.find('button').trigger('click')
      expect(wrapper.props('modelValue')).toBe(true)
      expect(wrapper.find('#splash-info-panel').exists()).toBe(true)
    })

    it('closes the panel when the toggle button is clicked again', async () => {
      await wrapper.find('button').trigger('click')
      expect(wrapper.props('modelValue')).toBe(true)

      await wrapper.find('button').trigger('click')
      expect(wrapper.props('modelValue')).toBe(false)
      expect(wrapper.find('#splash-info-panel').exists()).toBe(false)
    })
  })

  describe('Keyboard interaction', () => {
    it('toggles panel on Enter key', async () => {
      await wrapper.find('button').trigger('keydown', { key: 'Enter' })
      expect(wrapper.props('modelValue')).toBe(true)

      await wrapper.find('button').trigger('keydown', { key: 'Enter' })
      expect(wrapper.props('modelValue')).toBe(false)
    })

    it('toggles panel on Space key', async () => {
      await wrapper.find('button').trigger('keydown', { key: ' ' })
      expect(wrapper.props('modelValue')).toBe(true)

      await wrapper.find('button').trigger('keydown', { key: ' ' })
      expect(wrapper.props('modelValue')).toBe(false)
    })

    it('closes panel on Escape key', async () => {
      await wrapper.find('button').trigger('click')
      expect(wrapper.props('modelValue')).toBe(true)

      await wrapper.find('button').trigger('keydown', { key: 'Escape' })
      expect(wrapper.props('modelValue')).toBe(false)
    })

    it('does nothing on Escape when panel is already closed', async () => {
      await wrapper.find('button').trigger('keydown', { key: 'Escape' })
      expect(wrapper.props('modelValue')).toBe(false)
    })
  })

  describe('Click outside', () => {
    it('closes the panel when clicking outside', async () => {
      await wrapper.find('button').trigger('click')
      expect(wrapper.props('modelValue')).toBe(true)

      document.dispatchEvent(new MouseEvent('click', { bubbles: true }))
      await wrapper.vm.$nextTick()
      expect(wrapper.props('modelValue')).toBe(false)
    })

    it('does not close the panel when clicking inside', async () => {
      await wrapper.find('button').trigger('click')
      expect(wrapper.props('modelValue')).toBe(true)

      await wrapper.find('#splash-info-panel').trigger('click')
      expect(wrapper.props('modelValue')).toBe(true)
    })
  })

  describe('Accessibility', () => {
    it('has aria-expanded="false" when panel is closed', () => {
      expect(wrapper.find('button').attributes('aria-expanded')).toBe('false')
    })

    it('has aria-expanded="true" when panel is open', async () => {
      await wrapper.find('button').trigger('click')
      expect(wrapper.find('button').attributes('aria-expanded')).toBe('true')
    })

    it('has aria-controls pointing to the panel id', () => {
      expect(wrapper.find('button').attributes('aria-controls')).toBe('splash-info-panel')
    })

    it('has aria-label on the toggle button', () => {
      expect(wrapper.find('button').attributes('aria-label')).toBe('About B.E.A.C.O.N.')
    })

    it('panel has role="region"', async () => {
      await wrapper.find('button').trigger('click')
      expect(wrapper.find('#splash-info-panel').attributes('role')).toBe('region')
    })

    it('panel has aria-label', async () => {
      await wrapper.find('button').trigger('click')
      expect(wrapper.find('#splash-info-panel').attributes('aria-label')).toBe('About B.E.A.C.O.N.')
    })
  })
})
