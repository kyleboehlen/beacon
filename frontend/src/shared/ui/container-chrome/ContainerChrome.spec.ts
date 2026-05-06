import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ContainerChrome from './ContainerChrome.vue'

describe('ContainerChrome', () => {
  it('does not render side decorations by default', () => {
    const wrapper = mount(ContainerChrome)
    expect(wrapper.find('.rotate-45').exists()).toBe(false)
  })

  it('renders side decorations when showSideDecorations is true', () => {
    const wrapper = mount(ContainerChrome, { props: { showSideDecorations: true } })
    expect(wrapper.find('.rotate-45').exists()).toBe(true)
  })
})