import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach } from 'vitest'
import SideDrawer from './SideDrawer.vue'

describe('SideDrawer', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
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
})
