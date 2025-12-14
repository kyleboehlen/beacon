import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import FullDashboardWidget from './FullDashboardWidget.vue'

describe('FullDashboardWidget', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
    document.body.style.overflow = ''
  })

  it('shows dashboard panel by default', () => {
    const wrapper = mount(FullDashboardWidget, {
      attachTo: document.body,
    })

    const dashboardPanel = wrapper.get('#tab-panel-dashboard')
    expect(dashboardPanel.attributes('aria-hidden')).toBe('false')

    wrapper.unmount()
  })

  it('switches to correct panel when tab is clicked', async () => {
    const wrapper = mount(FullDashboardWidget, {
      attachTo: document.body,
    })

    // Click on Econ tab
    const econTab = wrapper.get('#tab-econ')
    await econTab.trigger('click')

    // Econ panel should be visible
    const econPanel = wrapper.get('#tab-panel-econ')
    expect(econPanel.attributes('aria-hidden')).toBe('false')

    // Dashboard panel should be hidden
    const dashboardPanel = wrapper.get('#tab-panel-dashboard')
    expect(dashboardPanel.attributes('aria-hidden')).toBe('true')

    wrapper.unmount()
  })

  it('shows settings panel when settings button is clicked', async () => {
    const wrapper = mount(FullDashboardWidget, {
      attachTo: document.body,
    })

    // Click settings button
    const settingsButton = wrapper.get('#settings-button')
    await settingsButton.trigger('click')

    // Settings panel should be visible
    const settingsPanel = wrapper.get('#settings-panel')
    expect(settingsPanel.attributes('aria-hidden')).toBe('false')

    // Settings button should have aria-pressed="true"
    expect(settingsButton.attributes('aria-pressed')).toBe('true')

    wrapper.unmount()
  })

  it('updates aria-expanded when drawer opens and closes', async () => {
    const wrapper = mount(FullDashboardWidget, {
      attachTo: document.body,
    })

    const hamburgerButton = wrapper.find('[aria-label="Menu"]')
    expect(hamburgerButton.attributes('aria-expanded')).toBe('false')

    // Open drawer
    await hamburgerButton.trigger('click')
    await wrapper.vm.$nextTick()

    // Wait for the drawer to emit opened event
    await new Promise((resolve) => setTimeout(resolve, 50))

    expect(hamburgerButton.attributes('aria-expanded')).toBe('true')

    // Close drawer (via exposed method)
    const drawer = wrapper.findComponent({ name: 'SideDrawer' })
    drawer.vm.close()
    await wrapper.vm.$nextTick()

    expect(hamburgerButton.attributes('aria-expanded')).toBe('false')

    wrapper.unmount()
  })

  it('has correct ARIA attributes for tab panels', () => {
    const wrapper = mount(FullDashboardWidget, {
      attachTo: document.body,
    })

    // Check dashboard panel
    const dashboardPanel = wrapper.get('#tab-panel-dashboard')
    expect(dashboardPanel.attributes('role')).toBe('tabpanel')
    expect(dashboardPanel.attributes('aria-labelledby')).toBe('tab-dashboard')

    // Check econ panel
    const econPanel = wrapper.get('#tab-panel-econ')
    expect(econPanel.attributes('role')).toBe('tabpanel')
    expect(econPanel.attributes('aria-labelledby')).toBe('tab-econ')

    wrapper.unmount()
  })

  it('has correct ARIA attributes for settings panel', () => {
    const wrapper = mount(FullDashboardWidget, {
      attachTo: document.body,
    })

    const settingsPanel = wrapper.get('#settings-panel')
    expect(settingsPanel.attributes('role')).toBe('region')
    expect(settingsPanel.attributes('aria-labelledby')).toBe('settings-button')

    wrapper.unmount()
  })
})