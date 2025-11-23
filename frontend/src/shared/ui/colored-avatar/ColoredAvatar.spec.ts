import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import ColoredAvatar from './ColoredAvatar.vue'

describe('ColoredAvatar', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })

  it('displays the avatar icon', () => {
    const wrapper = mount(ColoredAvatar)
    expect(wrapper.find('[data-test-id="avatar-icon"]').exists()).toBe(true)
  })

  it('opens color picker when toggle button is clicked', async () => {
    const wrapper = mount(ColoredAvatar, {
      props: { allowColorChange: true },
    })

    const toggleButton = wrapper.find('button[aria-haspopup="dialog"]')
    await toggleButton.trigger('click')

    expect(wrapper.find('[role="dialog"]').exists()).toBe(true)
  })

  it('closes color picker when a color is selected', async () => {
    const wrapper = mount(ColoredAvatar, {
      props: { initialColor: 'blue-700', allowColorChange: true },
    })

    // Open picker
    await wrapper.find('button[aria-haspopup="dialog"]').trigger('click')
    expect(wrapper.find('[role="dialog"]').exists()).toBe(true)

    // Select a color
    const colorButtons = wrapper.findAll('[role="group"] button')
    if (colorButtons.length > 0) {
      await colorButtons[0].trigger('click')
    }

    // Picker should close
    expect(wrapper.find('[role="dialog"]').exists()).toBe(false)
  })

  it('closes color picker when backdrop is clicked', async () => {
    const wrapper = mount(ColoredAvatar, {
      props: { allowColorChange: true },
    })

    // Open picker
    await wrapper.find('button[aria-haspopup="dialog"]').trigger('click')
    expect(wrapper.find('[role="dialog"]').exists()).toBe(true)

    // Click backdrop
    const backdrop = wrapper.find('[aria-hidden="true"].fixed')
    await backdrop.trigger('click')

    // Picker should close
    expect(wrapper.find('[role="dialog"]').exists()).toBe(false)
  })

  it('closes color picker when Escape key is pressed', async () => {
    const wrapper = mount(ColoredAvatar, {
      props: { allowColorChange: true },
    })

    // Open picker
    await wrapper.find('button[aria-haspopup="dialog"]').trigger('click')
    expect(wrapper.find('[role="dialog"]').exists()).toBe(true)

    // Press Escape
    const dialog = wrapper.find('[role="dialog"]')
    await dialog.trigger('keydown', { key: 'Escape' })

    // Picker should close
    expect(wrapper.find('[role="dialog"]').exists()).toBe(false)
  })

  it('closes color picker when Close button is clicked', async () => {
    const wrapper = mount(ColoredAvatar, {
      props: { allowColorChange: true },
    })

    // Open picker
    await wrapper.find('button[aria-haspopup="dialog"]').trigger('click')
    expect(wrapper.find('[role="dialog"]').exists()).toBe(true)

    // Click Close button
    const closeButton = wrapper.find('[role="dialog"] button')
    await closeButton.trigger('click')

    // Picker should close
    expect(wrapper.find('[role="dialog"]').exists()).toBe(false)
  })

  it('does not show color picker when allowColorChange is false', () => {
    const wrapper = mount(ColoredAvatar, {
      props: { allowColorChange: false },
    })

    expect(wrapper.find('button[aria-haspopup="dialog"]').exists()).toBe(false)
    expect(wrapper.find('[role="dialog"]').exists()).toBe(false)
  })

  it('announces current color without shade number', () => {
    const wrapper = mount(ColoredAvatar, {
      props: { initialColor: 'red-700', allowColorChange: true },
    })

    const toggleButton = wrapper.find('button[aria-haspopup="dialog"]')
    expect(toggleButton.attributes('aria-label')).toContain('red')
    expect(toggleButton.attributes('aria-label')).not.toContain('700')
  })

  it('marks selected color with aria-pressed', async () => {
    const wrapper = mount(ColoredAvatar, {
      props: { initialColor: 'blue-700', allowColorChange: true },
    })

    // Open picker
    await wrapper.find('button[aria-haspopup="dialog"]').trigger('click')

    // Check for aria-pressed on color buttons
    const colorButtons = wrapper.findAll('[role="group"] button')
    const pressedButtons = colorButtons.filter(
      (button) => button.attributes('aria-pressed') === 'true',
    )

    expect(pressedButtons.length).toBeGreaterThan(0)
  })

  it('updates aria-expanded when picker opens and closes', async () => {
    const wrapper = mount(ColoredAvatar, {
      props: { allowColorChange: true },
    })

    const toggleButton = wrapper.find('button[aria-haspopup="dialog"]')

    // Initially closed
    expect(toggleButton.attributes('aria-expanded')).toBe('false')

    // Open
    await toggleButton.trigger('click')
    expect(toggleButton.attributes('aria-expanded')).toBe('true')

    // Close
    await toggleButton.trigger('click')
    expect(toggleButton.attributes('aria-expanded')).toBe('false')
  })
})
