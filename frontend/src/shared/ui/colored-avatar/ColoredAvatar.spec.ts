import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import ColoredAvatar from './ColoredAvatar.vue'

describe('ColoredAvatar', () => {
  it('displays the avatar icon', () => {
    const wrapper = mount(ColoredAvatar)
    expect(wrapper.find('[data-test-id="avatar-icon"]').exists()).toBe(true)
  })

  it('changes border color when a new color is selected', async () => {
    const wrapper = mount(ColoredAvatar, {
      props: { initialColor: 'blue-700', allowColorChange: true },
    })

    const initialBorderClasses = wrapper.find('.rounded-full.border-4').classes()

    const colorButtons = wrapper.findAll('button[aria-label^="Select"]')
    await colorButtons[0].trigger('click')

    const updatedBorderClasses = wrapper.find('.rounded-full.border-4').classes()
    expect(updatedBorderClasses).not.toEqual(initialBorderClasses)
  })

  it('changes icon color when a new color is selected', async () => {
    const wrapper = mount(ColoredAvatar, {
      props: { initialColor: 'blue-700', allowColorChange: true },
    })

    const icon = wrapper.find('[data-test-id="avatar-icon"]')
    const initialIconClasses = icon.classes()

    const colorButtons = wrapper.findAll('button[aria-label^="Select"]')
    await colorButtons[0].trigger('click')

    const updatedIconClasses = icon.classes()
    expect(updatedIconClasses).not.toEqual(initialIconClasses)
  })

  it('does not show color picker when allowColorChange is false', () => {
    const wrapper = mount(ColoredAvatar, {
      props: { allowColorChange: false },
    })

    expect(wrapper.find('[role="tooltip"]').exists()).toBe(false)
    expect(wrapper.findAll('button[aria-label^="Select"]').length).toBe(0)
  })

  it('allows keyboard activation with Enter when color change is enabled', async () => {
    const wrapper = mount(ColoredAvatar, {
      props: { allowColorChange: true },
    })

    const toggle = wrapper.find('.hs-tooltip-toggle')

    // Cast to HTMLElement and spy on click method
    const clickSpy = vi.fn()
    const toggleElement = toggle.element as HTMLElement
    toggleElement.click = clickSpy

    await toggle.trigger('keydown.enter')
    expect(clickSpy).toHaveBeenCalled()
  })

  it('does not allow keyboard activation when color change is disabled', async () => {
    const wrapper = mount(ColoredAvatar, {
      props: { allowColorChange: false },
    })

    const container = wrapper.find('.flex.items-center')
    expect(container.attributes('tabindex')).toBeUndefined()
  })
})
