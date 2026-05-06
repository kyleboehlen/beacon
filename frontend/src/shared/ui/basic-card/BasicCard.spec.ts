import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BasicCard from './BasicCard.vue'

describe('BasicCard', () => {
  it('renders the title prop value in the heading', () => {
    const wrapper = mount(BasicCard, { props: { title: 'My Card' } })
    expect(wrapper.find('h3').text()).toBe('My Card')
  })

  it('renders title slot content in the heading', () => {
    const wrapper = mount(BasicCard, { slots: { title: 'Custom Title' } })
    expect(wrapper.find('h3').text()).toContain('Custom Title')
  })

  it('hides the heading when neither title prop nor title slot is provided', () => {
    const wrapper = mount(BasicCard)
    expect(wrapper.find('h3').exists()).toBe(false)
  })
})