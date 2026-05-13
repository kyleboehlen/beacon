import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Badge from './Badge.vue'

describe('Badge', () => {
  describe('slot content', () => {
    it('renders provided slot text to the user', () => {
      const wrapper = mount(Badge, { slots: { default: 'Round 3' } })
      expect(wrapper.text()).toBe('Round 3')
    })
  })

  describe('accessibility', () => {
    it('exposes label prop as aria-label for screen readers', () => {
      const wrapper = mount(Badge, { props: { label: 'Current round number' } })
      expect(wrapper.attributes('aria-label')).toBe('Current round number')
    })

    it('omits aria-label when no label prop is given', () => {
      const wrapper = mount(Badge)
      expect(wrapper.attributes('aria-label')).toBeUndefined()
    })
  })
})