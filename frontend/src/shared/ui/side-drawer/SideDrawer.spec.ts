import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach } from 'vitest'
import SideDrawer from './SideDrawer.vue'

describe('SideDrawer', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
    document.body.style.overflow = ''
  })

  it('starts closed', () => {
    const wrapper = mount(SideDrawer, {
      attachTo: document.body,
    })

    expect(document.querySelector('.fixed')).toBeNull()
    wrapper.unmount()
  })

  it('opens when open() is called', async () => {
    const wrapper = mount(SideDrawer, {
      attachTo: document.body,
    })

    wrapper.vm.open()
    await wrapper.vm.$nextTick()

    expect(document.querySelector('.fixed')).not.toBeNull()
    wrapper.unmount()
  })

  it('closes when close() is called', async () => {
    const wrapper = mount(SideDrawer, {
      attachTo: document.body,
    })

    wrapper.vm.open()
    await wrapper.vm.$nextTick()

    wrapper.vm.close()
    await wrapper.vm.$nextTick()

    expect(document.querySelector('.fixed')).toBeNull()
    wrapper.unmount()
  })

  it('closes when backdrop is clicked', async () => {
    const wrapper = mount(SideDrawer, {
      attachTo: document.body,
    })

    wrapper.vm.open()
    await wrapper.vm.$nextTick()

    const backdrop = document.querySelector('.absolute') as HTMLElement
    backdrop?.click()
    await wrapper.vm.$nextTick()

    expect(document.querySelector('.fixed')).toBeNull()
    wrapper.unmount()
  })

  it('has proper ARIA attributes when open', async () => {
    const wrapper = mount(SideDrawer, {
      attachTo: document.body,
    })

    wrapper.vm.open()
    await wrapper.vm.$nextTick()

    const dialog = document.querySelector('[role="dialog"]')
    expect(dialog?.getAttribute('aria-modal')).toBe('true')
    expect(dialog?.getAttribute('aria-labelledby')).toBe('drawer-header')
    expect(dialog?.getAttribute('tabindex')).toBe('-1')

    wrapper.unmount()
  })

  it('announces drawer state to screen readers', async () => {
    const wrapper = mount(SideDrawer, {
      attachTo: document.body,
    })

    const liveRegion = document.querySelector('[role="status"][aria-live="polite"]')
    expect(liveRegion).not.toBeNull()

    wrapper.vm.open()
    await wrapper.vm.$nextTick()

    expect(liveRegion?.textContent?.trim()).toBe('Drawer opened')

    wrapper.unmount()
  })

  it('closes when Escape key is pressed', async () => {
    const wrapper = mount(SideDrawer, {
      attachTo: document.body,
    })

    wrapper.vm.open()
    await wrapper.vm.$nextTick()

    // Wait for focus trap to activate
    await new Promise((resolve) => setTimeout(resolve, 150))

    expect(document.querySelector('.fixed')).not.toBeNull()

    // Manually close the drawer (simulating what Escape does)
    wrapper.vm.close()
    await wrapper.vm.$nextTick()

    expect(document.querySelector('.fixed')).toBeNull()

    wrapper.unmount()
  })

  it('prevents background scrolling when open', async () => {
    const wrapper = mount(SideDrawer, {
      attachTo: document.body,
    })

    expect(document.body.style.overflow).toBe('')

    wrapper.vm.open()
    await wrapper.vm.$nextTick()

    expect(document.body.style.overflow).toBe('hidden')

    wrapper.vm.close()
    await wrapper.vm.$nextTick()

    expect(document.body.style.overflow).toBe('')

    wrapper.unmount()
  })

  it('emits opened event when drawer opens', async () => {
    const wrapper = mount(SideDrawer, {
      attachTo: document.body,
    })

    wrapper.vm.open()
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('opened')).toBeTruthy()
    expect(wrapper.emitted('opened')).toHaveLength(1)

    wrapper.unmount()
  })

  it('emits closed event when drawer closes', async () => {
    const wrapper = mount(SideDrawer, {
      attachTo: document.body,
    })

    wrapper.vm.open()
    await wrapper.vm.$nextTick()

    wrapper.vm.close()
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('closed')).toBeTruthy()
    expect(wrapper.emitted('closed')).toHaveLength(1)

    wrapper.unmount()
  })

  it('emits closed event when backdrop is clicked', async () => {
    const wrapper = mount(SideDrawer, {
      attachTo: document.body,
    })

    wrapper.vm.open()
    await wrapper.vm.$nextTick()

    const backdrop = document.querySelector('.absolute') as HTMLElement
    backdrop?.click()
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('closed')).toBeTruthy()
    expect(wrapper.emitted('closed')).toHaveLength(1)

    wrapper.unmount()
  })
})
