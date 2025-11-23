import { describe, it, expect, beforeEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { createRouter, createMemoryHistory, type Router } from 'vue-router'
import SplashTitles from './SplashTitles.vue'
import { DashboardPage } from '@/pages/dashboard-page'
import { TitlePage } from '@/pages/title-page'

describe('SplashTitles', () => {
  let router: Router

  beforeEach(async () => {
    router = createRouter({
      history: createMemoryHistory(),
      routes: [
        { path: '/', name: 'root', component: TitlePage },
        { path: '/dashboard', name: 'dashboard', component: DashboardPage },
      ],
    })
    await router.push('/')
    await router.isReady()
  })

  it('redirects to /dashboard on button click', async () => {
    const wrapper = mount(SplashTitles, {
      global: {
        plugins: [router],
      },
    })

    await wrapper.find('button').trigger('click')
    await flushPromises()
    expect(router.currentRoute.value.path).toBe('/dashboard')
  })

  it('redirects to /dashboard on any key press', async () => {
    const wrapper = mount(SplashTitles, {
      global: {
        plugins: [router],
      },
    })

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }))
    await wrapper.vm.$nextTick()
    await flushPromises()
    expect(router.currentRoute.value.path).toBe('/dashboard')
  })

  it('does not redirect on modifier-only key press', async () => {
    mount(SplashTitles, {
      global: {
        plugins: [router],
      },
    })

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Shift' }))
    await flushPromises()
    expect(router.currentRoute.value.path).toBe('/')
  })
})
