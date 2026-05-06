import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import FullDashboardWidget from './FullDashboardWidget.vue'
import { useGameStore } from '@/entities/_game'
import type { RulesConfig } from '@/entities/rules'

// Prevent RulesWizard's fetch-on-mount from hanging flushPromises in jsdom
vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('fetch not available in tests')))

describe('FullDashboardWidget', () => {
  beforeEach(() => {
    const pinia = createPinia()
    setActivePinia(pinia)

    document.body.innerHTML = ''
    document.body.style.overflow = ''
  })

  describe('Initial state (no game)', () => {
    it('shows dashboard panel by default', () => {
      const wrapper = mount(FullDashboardWidget, {
        attachTo: document.body,
      })

      const dashboardPanel = wrapper.get('#tab-panel-dashboard')
      expect(dashboardPanel.attributes('aria-hidden')).toBe('false')

      wrapper.unmount()
    })

    it('shows attention badge on dashboard tab when no game exists', () => {
      const wrapper = mount(FullDashboardWidget, {
        attachTo: document.body,
      })

      const attentionBadge = wrapper.find('[aria-label="Dashboard Tab"]')
      expect(attentionBadge.exists()).toBe(true)

      wrapper.unmount()
    })

    it('disables all tabs but dashboard when no game exists', () => {
      const wrapper = mount(FullDashboardWidget, {
        attachTo: document.body,
      })

      const dashboardTab = wrapper.get('#tab-dashboard')
      expect(dashboardTab.attributes('disabled')).not.toBeDefined()
      expect(dashboardTab.attributes('aria-disabled')).toBe('false')

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

      wrapper.unmount()
    })

    it('disables settings button when no game exists', () => {
      const wrapper = mount(FullDashboardWidget, {
        attachTo: document.body,
      })

      const settingsButton = wrapper.get('#button-game-settings')
      expect(settingsButton.attributes('disabled')).toBeDefined()
      expect(settingsButton.attributes('aria-disabled')).toBe('true')

      wrapper.unmount()
    })

    it('does not show attention badge on settings icon when no game exists', () => {
      const wrapper = mount(FullDashboardWidget, {
        attachTo: document.body,
      })

      const attentionBadge = wrapper.find('[aria-label="Settings Icon"]')
      expect(attentionBadge.exists()).toBe(false)

      wrapper.unmount()
    })
  })

  describe('Creating a new game', () => {
    it('switches to settings tab when new scenario button is clicked', async () => {
      vi.useFakeTimers()

      const wrapper = mount(FullDashboardWidget, {
        attachTo: document.body,
      })

      // Advance past both SystemStatus checks (longest is 4000ms)
      await vi.advanceTimersByTimeAsync(4001)

      // Click new scenario button (now enabled)
      const newScenarioButton = wrapper.get('#new-scenario-button')
      await newScenarioButton.trigger('click')
      await wrapper.vm.$nextTick()

      // Should switch to settings panel
      const settingsPanel = wrapper.get('#button-game-settings-panel')
      expect(settingsPanel.attributes('aria-hidden')).toBe('false')

      vi.useRealTimers()
      wrapper.unmount()
    })
  })

  describe('State with game but no rules', () => {
    beforeEach(() => {
      const gameStore = useGameStore()
      gameStore.setGame()
    })

    it('shows attention badge on settings icon when game exists but rules is null', () => {
      const wrapper = mount(FullDashboardWidget, {
        attachTo: document.body,
      })

      const attentionBadge = wrapper.find('[aria-label="Settings Icon"]')
      expect(attentionBadge.exists()).toBe(true)

      wrapper.unmount()
    })

    it('enables settings button when game exists but rules is null', () => {
      const wrapper = mount(FullDashboardWidget, {
        attachTo: document.body,
      })

      const settingsButton = wrapper.get('#button-game-settings')
      expect(settingsButton.attributes('disabled')).toBeUndefined()
      expect(settingsButton.attributes('aria-disabled')).toBe('false')

      wrapper.unmount()
    })

    it('disables all tabs when game exists but rules is null', () => {
      const wrapper = mount(FullDashboardWidget, {
        attachTo: document.body,
      })

      const dashboardTab = wrapper.get('#tab-dashboard')
      expect(dashboardTab.attributes('disabled')).toBeDefined()

      const econTab = wrapper.get('#tab-econ')
      expect(econTab.attributes('disabled')).toBeDefined()

      const fleetTab = wrapper.get('#tab-fleet')
      expect(fleetTab.attributes('disabled')).toBeDefined()

      const intelTab = wrapper.get('#tab-intel')
      expect(intelTab.attributes('disabled')).toBeDefined()

      const battleTab = wrapper.get('#tab-battle')
      expect(battleTab.attributes('disabled')).toBeDefined()

      wrapper.unmount()
    })

    it('shows rules wizard in settings panel', async () => {
      const wrapper = mount(FullDashboardWidget, {
        attachTo: document.body,
      })

      // Switch to settings panel
      const settingsButton = wrapper.get('#button-game-settings')
      await settingsButton.trigger('click')
      await wrapper.vm.$nextTick()

      // Rules wizard loading state should be visible
      const settingsPanel = wrapper.get('#button-game-settings-panel')
      expect(settingsPanel.text()).toContain('Loading rules')

      wrapper.unmount()
    })
  })

  describe('Creating rules', () => {
    beforeEach(() => {
      const gameStore = useGameStore()
      gameStore.setGame()
    })

    it('switches back to dashboard tab when rules wizard completes', async () => {
      const wrapper = mount(FullDashboardWidget, {
        attachTo: document.body,
      })

      // Switch to settings panel
      const settingsButton = wrapper.get('#button-game-settings')
      await settingsButton.trigger('click')
      await wrapper.vm.$nextTick()

      // Settings panel should be visible
      let settingsPanel = wrapper.get('#button-game-settings-panel')
      expect(settingsPanel.attributes('aria-hidden')).toBe('false')

      // Simulate the wizard completing via rulesCreated emit from GameSettingsPanel
      wrapper.findComponent({ name: 'GameSettingsPanel' }).vm.$emit('rulesCreated')
      await wrapper.vm.$nextTick()

      // Dashboard panel should now be visible
      const dashboardPanel = wrapper.get('#tab-panel-dashboard')
      expect(dashboardPanel.attributes('aria-hidden')).toBe('false')

      // Settings panel should be hidden
      settingsPanel = wrapper.get('#button-game-settings-panel')
      expect(settingsPanel.attributes('aria-hidden')).toBe('true')

      wrapper.unmount()
    })
  })

  describe('State with game and rules', () => {
    beforeEach(() => {
      const gameStore = useGameStore()
      gameStore.setGame()
      gameStore.embedRulesConfig({} as RulesConfig)
    })

    it('enables all tabs when game and rules exist', () => {
      const wrapper = mount(FullDashboardWidget, {
        attachTo: document.body,
      })

      const dashboardTab = wrapper.get('#tab-dashboard')
      expect(dashboardTab.attributes('disabled')).toBeFalsy()
      expect(dashboardTab.attributes('aria-disabled')).toBe('false')

      const econTab = wrapper.get('#tab-econ')
      expect(econTab.attributes('disabled')).toBeFalsy()
      expect(econTab.attributes('aria-disabled')).toBe('false')

      const fleetTab = wrapper.get('#tab-fleet')
      expect(fleetTab.attributes('disabled')).toBeFalsy()
      expect(fleetTab.attributes('aria-disabled')).toBe('false')

      const intelTab = wrapper.get('#tab-intel')
      expect(intelTab.attributes('disabled')).toBeFalsy()
      expect(intelTab.attributes('aria-disabled')).toBe('false')

      const battleTab = wrapper.get('#tab-battle')
      expect(battleTab.attributes('disabled')).toBeFalsy()
      expect(battleTab.attributes('aria-disabled')).toBe('false')

      wrapper.unmount()
    })

    it('enables settings button when game and rules exist', () => {
      const wrapper = mount(FullDashboardWidget, {
        attachTo: document.body,
      })

      const settingsButton = wrapper.get('#button-game-settings')
      expect(settingsButton.attributes('disabled')).toBeUndefined()
      expect(settingsButton.attributes('aria-disabled')).toBe('false')

      wrapper.unmount()
    })

    it('does not show attention badges when game and rules exist', () => {
      const wrapper = mount(FullDashboardWidget, {
        attachTo: document.body,
      })

      const settingsAttentionBadge = wrapper.find('span[role="status"][aria-label="Settings Icon"]')
      expect(settingsAttentionBadge.exists()).toBe(false)

      const dashboardAttentionBadge = wrapper.find('span[role="status"][aria-label="Dashboard Tab"]')
      expect(dashboardAttentionBadge.exists()).toBe(false)

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
  })

  describe('ARIA attributes', () => {
    beforeEach(() => {
      const gameStore = useGameStore()
      gameStore.setGame()
      gameStore.embedRulesConfig({} as RulesConfig)
    })

    it('has correct ARIA attributes for tab panels', () => {
      const wrapper = mount(FullDashboardWidget, {
        attachTo: document.body,
      })

      const dashboardPanel = wrapper.get('#tab-panel-dashboard')
      expect(dashboardPanel.attributes('role')).toBe('tabpanel')
      expect(dashboardPanel.attributes('aria-labelledby')).toBe('tab-dashboard')

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
      expect(settingsPanel.attributes('aria-labelledby')).toBe('button-game-settings')

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
      await wrapper.vm.$nextTick()
      await wrapper.vm.$nextTick() // Extra tick for animation

      expect(hamburgerButton.attributes('aria-expanded')).toBe('true')

      // Close drawer (via exposed method)
      const drawer = wrapper.findComponent({ name: 'SideDrawer' })
      drawer.vm.close()
      await wrapper.vm.$nextTick()

      expect(hamburgerButton.attributes('aria-expanded')).toBe('false')

      wrapper.unmount()
    })
  })
})
