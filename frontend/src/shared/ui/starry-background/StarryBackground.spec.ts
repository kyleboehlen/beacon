import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import StarryBackground from './StarryBackground.vue'

describe('StarryBackground', () => {
  it('renders slot content', () => {
    const wrapper = mount(StarryBackground, {
      slots: { default: '<p>lk239ovgfjwer</p>' },
    })
    expect(wrapper.text()).toContain('lk239ovgfjwer')
  })
})