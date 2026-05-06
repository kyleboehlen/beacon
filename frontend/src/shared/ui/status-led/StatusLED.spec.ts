import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import StatusLED from './StatusLED.vue'

describe('StatusLED', () => {
  describe('Variant classes', () => {
    it('applies red background class for red variant', () => {
      const wrapper = mount(StatusLED, { props: { variant: 'red' } })
      expect(wrapper.classes()).toContain('bg-red-500')
    })

    it('applies yellow background class for yellow variant', () => {
      const wrapper = mount(StatusLED, { props: { variant: 'yellow' } })
      expect(wrapper.classes()).toContain('bg-yellow-500')
    })

    it('applies green background class by default', () => {
      const wrapper = mount(StatusLED)
      expect(wrapper.classes()).toContain('bg-green-500')
    })
  })

  describe('Accessibility', () => {
    it('aria-label includes the variant name', () => {
      const wrapper = mount(StatusLED, { props: { variant: 'red' } })
      expect(wrapper.attributes('aria-label')).toContain('red')
    })
  })
})