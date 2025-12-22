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

  it('applies disabled attribute when disabled', () => {
    const wrapper = mount(BasicButton, {
      props: {
        disabled: true,
      },
      slots: {
        default: 'Button',
      },
    })

    expect(wrapper.attributes('disabled')).toBeDefined()
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
})
