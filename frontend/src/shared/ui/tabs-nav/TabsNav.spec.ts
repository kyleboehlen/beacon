import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TabsNav from './TabsNav.vue'

describe('TabsNav', () => {
  const defaultTabs = [
    { key: 'tab1', label: 'Tab 1' },
    { key: 'tab2', label: 'Tab 2' },
    { key: 'tab3', label: 'Tab 3' },
  ]

  it('renders all tab labels', () => {
    const wrapper = mount(TabsNav, {
      props: {
        tabs: defaultTabs,
        modelValue: 'tab1',
      },
    })

    expect(wrapper.text()).toContain('Tab 1')
    expect(wrapper.text()).toContain('Tab 2')
    expect(wrapper.text()).toContain('Tab 3')
  })

  it('emits update:modelValue when tab is clicked', async () => {
    const wrapper = mount(TabsNav, {
      props: {
        tabs: defaultTabs,
        modelValue: 'tab1',
      },
    })

    const buttons = wrapper.findAll('button')
    await buttons[1].trigger('click')

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['tab2'])
  })

  it('applies custom styles prop to tabs', () => {
    const styledTabs = [
      { key: 'tab1', label: 'Tab 1', styles: 'custom-class-1' },
      { key: 'tab2', label: 'Tab 2', styles: 'custom-class-2' },
    ]

    const wrapper = mount(TabsNav, {
      props: {
        tabs: styledTabs,
        modelValue: 'tab1',
      },
    })

    const buttons = wrapper.findAll('button')
    expect(buttons[0].classes()).toContain('custom-class-1')
    expect(buttons[1].classes()).toContain('custom-class-2')
  })

  it('applies custom activeStyles to selected tab', () => {
    const styledTabs = [
      {
        key: 'tab1',
        label: 'Tab 1',
        activeStyles: 'bg-blue-500',
        inactiveStyles: 'bg-gray-500',
      },
      {
        key: 'tab2',
        label: 'Tab 2',
        activeStyles: 'bg-red-500',
        inactiveStyles: 'bg-gray-500',
      },
    ]

    const wrapper = mount(TabsNav, {
      props: {
        tabs: styledTabs,
        modelValue: 'tab1',
      },
    })

    const buttons = wrapper.findAll('button')
    expect(buttons[0].classes()).toContain('bg-blue-500')
    expect(buttons[0].classes()).not.toContain('bg-gray-500')
    expect(buttons[1].classes()).toContain('bg-gray-500')
    expect(buttons[1].classes()).not.toContain('bg-red-500')
  })

  it('applies custom inactiveStyles to non-selected tabs', () => {
    const styledTabs = [
      {
        key: 'tab1',
        label: 'Tab 1',
        activeStyles: 'bg-blue-500',
        inactiveStyles: 'bg-gray-500',
      },
      {
        key: 'tab2',
        label: 'Tab 2',
        activeStyles: 'bg-red-500',
        inactiveStyles: 'bg-gray-500',
      },
    ]

    const wrapper = mount(TabsNav, {
      props: {
        tabs: styledTabs,
        modelValue: 'tab1',
      },
    })

    const buttons = wrapper.findAll('button')
    expect(buttons[1].classes()).toContain('bg-gray-500')
  })

  it('has proper ARIA attributes on tablist', () => {
    const wrapper = mount(TabsNav, {
      props: {
        tabs: defaultTabs,
        modelValue: 'tab1',
      },
    })

    const nav = wrapper.find('[role="tablist"]')
    expect(nav.exists()).toBe(true)
    expect(nav.attributes('aria-orientation')).toBe('horizontal')
  })

  it('has proper ARIA attributes on tab buttons', () => {
    const wrapper = mount(TabsNav, {
      props: {
        tabs: defaultTabs,
        modelValue: 'tab2',
      },
    })

    const buttons = wrapper.findAll('button')

    // Check first button (not selected)
    expect(buttons[0].attributes('role')).toBe('tab')
    expect(buttons[0].attributes('aria-selected')).toBe('false')
    expect(buttons[0].attributes('aria-controls')).toBe('tab-panel-tab1')

    // Check second button (selected)
    expect(buttons[1].attributes('role')).toBe('tab')
    expect(buttons[1].attributes('aria-selected')).toBe('true')
    expect(buttons[1].attributes('aria-controls')).toBe('tab-panel-tab2')
  })

  it('marks only the active tab with aria-selected="true"', () => {
    const wrapper = mount(TabsNav, {
      props: {
        tabs: defaultTabs,
        modelValue: 'tab2',
      },
    })

    const buttons = wrapper.findAll('button')
    const selectedButtons = buttons.filter(
      (button) => button.attributes('aria-selected') === 'true',
    )

    expect(selectedButtons.length).toBe(1)
    expect(selectedButtons[0].text()).toBe('Tab 2')
  })

  it('updates aria-selected when modelValue changes', async () => {
    const wrapper = mount(TabsNav, {
      props: {
        tabs: defaultTabs,
        modelValue: 'tab1',
      },
    })

    let buttons = wrapper.findAll('button')
    expect(buttons[0].attributes('aria-selected')).toBe('true')
    expect(buttons[1].attributes('aria-selected')).toBe('false')

    await wrapper.setProps({ modelValue: 'tab2' })

    buttons = wrapper.findAll('button')
    expect(buttons[0].attributes('aria-selected')).toBe('false')
    expect(buttons[1].attributes('aria-selected')).toBe('true')
  })

  it('has id attributes on tab buttons', () => {
    const wrapper = mount(TabsNav, {
      props: {
        tabs: defaultTabs,
        modelValue: 'tab1',
      },
    })

    const buttons = wrapper.findAll('button')
    expect(buttons[0].attributes('id')).toBe('tab-tab1')
    expect(buttons[1].attributes('id')).toBe('tab-tab2')
    expect(buttons[2].attributes('id')).toBe('tab-tab3')
  })

  it('uses roving tabindex - only active tab is in tab order', () => {
    const wrapper = mount(TabsNav, {
      props: {
        tabs: defaultTabs,
        modelValue: 'tab2',
      },
    })

    const buttons = wrapper.findAll('button')
    expect(buttons[0].attributes('tabindex')).toBe('-1')
    expect(buttons[1].attributes('tabindex')).toBe('0')
    expect(buttons[2].attributes('tabindex')).toBe('-1')
  })

  it('navigates to next tab with ArrowRight key', async () => {
    const wrapper = mount(TabsNav, {
      props: {
        tabs: defaultTabs,
        modelValue: 'tab1',
      },
    })

    const buttons = wrapper.findAll('button')
    await buttons[0].trigger('keydown', { key: 'ArrowRight' })

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['tab2'])
  })

  it('navigates to previous tab with ArrowLeft key', async () => {
    const wrapper = mount(TabsNav, {
      props: {
        tabs: defaultTabs,
        modelValue: 'tab2',
      },
    })

    const buttons = wrapper.findAll('button')
    await buttons[1].trigger('keydown', { key: 'ArrowLeft' })

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['tab1'])
  })

  it('wraps to first tab when pressing ArrowRight on last tab', async () => {
    const wrapper = mount(TabsNav, {
      props: {
        tabs: defaultTabs,
        modelValue: 'tab3',
      },
    })

    const buttons = wrapper.findAll('button')
    await buttons[2].trigger('keydown', { key: 'ArrowRight' })

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['tab1'])
  })

  it('wraps to last tab when pressing ArrowLeft on first tab', async () => {
    const wrapper = mount(TabsNav, {
      props: {
        tabs: defaultTabs,
        modelValue: 'tab1',
      },
    })

    const buttons = wrapper.findAll('button')
    await buttons[0].trigger('keydown', { key: 'ArrowLeft' })

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['tab3'])
  })

  it('navigates to first tab with Home key', async () => {
    const wrapper = mount(TabsNav, {
      props: {
        tabs: defaultTabs,
        modelValue: 'tab3',
      },
    })

    const buttons = wrapper.findAll('button')
    await buttons[2].trigger('keydown', { key: 'Home' })

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['tab1'])
  })

  it('navigates to last tab with End key', async () => {
    const wrapper = mount(TabsNav, {
      props: {
        tabs: defaultTabs,
        modelValue: 'tab1',
      },
    })

    const buttons = wrapper.findAll('button')
    await buttons[0].trigger('keydown', { key: 'End' })

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['tab3'])
  })
})
