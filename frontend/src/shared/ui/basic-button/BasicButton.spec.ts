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

  it('has type="button" by default', () => {
    const wrapper = mount(BasicButton, {
      slots: {
        default: 'Button',
      },
    })

    expect(wrapper.attributes('type')).toBe('button')
  })

  it('accepts custom type prop', () => {
    const wrapper = mount(BasicButton, {
      props: {
        type: 'submit',
      },
      slots: {
        default: 'Submit',
      },
    })

    expect(wrapper.attributes('type')).toBe('submit')
  })

  it('has aria-disabled when disabled', () => {
    const wrapper = mount(BasicButton, {
      props: {
        disabled: true,
      },
      slots: {
        default: 'Button',
      },
    })

    expect(wrapper.attributes('aria-disabled')).toBe('true')
  })

  it('accepts aria-label prop', () => {
    const wrapper = mount(BasicButton, {
      props: {
        ariaLabel: 'Close dialog',
      },
      slots: {
        default: 'X',
      },
    })

    expect(wrapper.attributes('aria-label')).toBe('Close dialog')
  })

  it('emits click on Enter key press', async () => {
    const wrapper = mount(BasicButton, {
      slots: {
        default: 'Button',
      },
    })

    await wrapper.trigger('keydown', { key: 'Enter' })

    expect(wrapper.emitted('click')).toBeTruthy()
    expect(wrapper.emitted('click')?.[0]).toBeTruthy()
  })

  it('emits click on Space key press', async () => {
    const wrapper = mount(BasicButton, {
      slots: {
        default: 'Button',
      },
    })

    await wrapper.trigger('keydown', { key: ' ' })

    expect(wrapper.emitted('click')).toBeTruthy()
    expect(wrapper.emitted('click')?.[0]).toBeTruthy()
  })

  it('does not emit click on Enter when disabled', async () => {
    const wrapper = mount(BasicButton, {
      props: {
        disabled: true,
      },
      slots: {
        default: 'Button',
      },
    })

    await wrapper.trigger('keydown', { key: 'Enter' })

    expect(wrapper.emitted('click')).toBeFalsy()
  })

  it('does not emit click on Space when disabled', async () => {
    const wrapper = mount(BasicButton, {
      props: {
        disabled: true,
      },
      slots: {
        default: 'Button',
      },
    })

    await wrapper.trigger('keydown', { key: ' ' })

    expect(wrapper.emitted('click')).toBeFalsy()
  })

  it('has focus-visible ring styles', () => {
    const wrapper = mount(BasicButton, {
      slots: {
        default: 'Button',
      },
    })

    expect(wrapper.classes()).toContain('focus-visible:ring-2')
    expect(wrapper.classes()).toContain('focus-visible:ring-white')
  })
})
