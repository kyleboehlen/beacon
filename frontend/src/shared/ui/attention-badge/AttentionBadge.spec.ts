import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AttentionBadge from './AttentionBadge.vue'

describe('AttentionBadge', () => {
  describe('ARIA role', () => {
    it('uses role="alert" for red variant', () => {
      const wrapper = mount(AttentionBadge, { props: { variant: 'red' } })
      expect(wrapper.attributes('role')).toBe('alert')
    })

    it('uses role="status" for yellow variant', () => {
      const wrapper = mount(AttentionBadge, { props: { variant: 'yellow' } })
      expect(wrapper.attributes('role')).toBe('status')
    })

    it('uses role="status" for green variant', () => {
      const wrapper = mount(AttentionBadge, { props: { variant: 'green' } })
      expect(wrapper.attributes('role')).toBe('status')
    })
  })

  describe('aria-live', () => {
    it('uses aria-live="assertive" for red variant', () => {
      const wrapper = mount(AttentionBadge, { props: { variant: 'red' } })
      expect(wrapper.attributes('aria-live')).toBe('assertive')
    })

    it('uses aria-live="polite" for yellow variant', () => {
      const wrapper = mount(AttentionBadge, { props: { variant: 'yellow' } })
      expect(wrapper.attributes('aria-live')).toBe('polite')
    })

    it('uses aria-live="polite" for green variant', () => {
      const wrapper = mount(AttentionBadge, { props: { variant: 'green' } })
      expect(wrapper.attributes('aria-live')).toBe('polite')
    })
  })

  describe('aria-label', () => {
    it('uses provided label prop', () => {
      const wrapper = mount(AttentionBadge, { props: { variant: 'red', label: 'Action required' } })
      expect(wrapper.attributes('aria-label')).toBe('Action required')
    })

    it('generates default label containing the variant name when no label provided', () => {
      const wrapper = mount(AttentionBadge, { props: { variant: 'yellow' } })
      expect(wrapper.attributes('aria-label')).toContain('yellow')
    })
  })
})