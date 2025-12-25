import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import FullDashboardWidget from './FullDashboardWidget.vue'
import { useGameStore } from '@/entities/_game'

describe('FullDashboardWidget', () => {
  beforeEach(() => {
    const pinia = createPinia()
    setActivePinia(pinia)

    // Initialize game store so tabs aren't disabled
    const gameStore = useGameStore()
    gameStore.setGame()

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
    const settingsButton = wrapper.get('#button-game-settings')
    await settingsButton.trigger('click')

    // Settings panel should be visible
    const settingsPanel = wrapper.get('#button-game-settings-panel')
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

    const settingsPanel = wrapper.get('#button-game-settings-panel')
    expect(settingsPanel.attributes('role')).toBe('region')
    expect(settingsPanel.attributes('aria-labelledby')).toBe('settings-button')

    wrapper.unmount()
  })

  it('disables tabs when game is not instantiated', () => {
    // Create fresh pinia without setting game as instantiated
    const pinia = createPinia()
    setActivePinia(pinia)

    const wrapper = mount(FullDashboardWidget, {
      attachTo: document.body,
    })

    // Check that econ, fleet, intel, battle tabs are disabled
    const econTab = wrapper.get('#tab-econ')
    expect(econTab.attributes('disabled')).toBeDefined()
    expect(econTab.attributes('aria-disabled')).toBe('true')

    const fleetTab = wrapper.get('#tab-fleet')
    expect(fleetTab.attributes('disabled')).toBeDefined()
    expect(fleetTab.attributes('aria-disabled')).toBe('true')

    const intelTab = wrapper.get('#tab-intel')
    expect(intelTab.attributes('disabled')).toBeDefined()
    expect(intelTab.attributes('aria-disabled')).toBe('true')

    const battleTab = wrapper.get('#tab-battle')
    expect(battleTab.attributes('disabled')).toBeDefined()
    expect(battleTab.attributes('aria-disabled')).toBe('true')

    // Dashboard tab should still be enabled
    const dashboardTab = wrapper.get('#tab-dashboard')
    expect(dashboardTab.attributes('disabled')).toBeUndefined()
    expect(dashboardTab.attributes('aria-disabled')).toBe('false')

    // Settings button should be disabled
    const settingsButton = wrapper.get('#button-game-settings')
    expect(settingsButton.attributes('disabled')).toBeDefined()
    expect(settingsButton.attributes('aria-disabled')).toBe('true')

    wrapper.unmount()
  })
})
