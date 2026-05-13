import { beforeEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import EconPanel from './EconPanel.vue'
import { useGameStore } from '@/entities/_game'

describe('EconPanel', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders new econ round button', () => {
    const wrapper = mount(EconPanel)
    expect(wrapper.text()).toContain('New Econ Round')
  })

  it('calls gameStore.econ.createNewRound when clicked', async () => {
    const gameStore = useGameStore()
    const spy = vi.spyOn(gameStore.econ, 'createNewRound')
    const wrapper = mount(EconPanel)

    await wrapper.get('#econ-new-round-button').trigger('click')

    expect(spy).toHaveBeenCalledOnce()
  })
})
