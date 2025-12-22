import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BasicButton from './BasicButton.vue'

describe('BasicButton', () => {
  it('renders slot content', () => {
    const wrapper = mount(BasicButton, {
      slots: {
        default: 'Click Me',
      },
    })

    expect(wrapper.text()).toBe('Click Me')
  })

  it('applies default inner styles', () => {
    const wrapper = mount(BasicButton, {
      slots: {
        default: 'Button',
      },
    })

    const span = wrapper.find('span')
    expect(span.classes()).toContain('bg-gray-900')
    expect(span.classes()).toContain('hover:bg-gray-800')
  })

  it('applies custom inner styles', () => {
    const wrapper = mount(BasicButton, {
      props: {
        innerStyles: 'bg-red-900 hover:bg-red-800',
      },
      slots: {
        default: 'Button',
      },
    })

    const span = wrapper.find('span')
    expect(span.classes()).toContain('bg-red-900')
    expect(span.classes()).toContain('hover:bg-red-800')
    expect(span.classes()).not.toContain('bg-gray-900')
  })

  it('applies disabled styles when disabled', () => {
    const wrapper = mount(BasicButton, {
      props: {
        disabled: true,
      },
      slots: {
        default: 'Button',
      },
    })

    expect(wrapper.attributes('disabled')).toBeDefined()
    expect(wrapper.classes()).toContain('bg-white/40')
    expect(wrapper.classes()).toContain('cursor-not-allowed')
    const span = wrapper.find('span')
    expect(span.classes()).toContain('opacity-50')
  })

  it('emits click event when clicked', async () => {
    const wrapper = mount(BasicButton, {
      slots: {
        default: 'Button',
      },
    })

    await wrapper.trigger('click')

    expect(wrapper.emitted('click')).toBeTruthy()
    expect(wrapper.emitted('click')?.[0]).toBeTruthy()
  })

  it('does not emit click event when disabled', async () => {
    const wrapper = mount(BasicButton, {
      props: {
        disabled: true,
      },
      slots: {
        default: 'Button',
      },
    })

    await wrapper.trigger('click')

    expect(wrapper.emitted('click')).toBeFalsy()
  })

  it('accepts custom classes', () => {
    const wrapper = mount(BasicButton, {
      attrs: {
        class: 'custom-class px-8 py-4',
      },
      slots: {
        default: 'Button',
      },
    })

    expect(wrapper.classes()).toContain('custom-class')
    expect(wrapper.classes()).toContain('px-8')
    expect(wrapper.classes()).toContain('py-4')
  })
})
