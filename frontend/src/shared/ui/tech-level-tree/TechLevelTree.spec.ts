import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TechLevelTree from './TechLevelTree.vue'
import type { LevelNode } from './types'

const nodes = (states: LevelNode['state'][]): LevelNode[] =>
  states.map((state, i) => ({ state, cost: i > 0 ? i * 10 : undefined }))

describe('TechLevelTree', () => {
  describe('node rendering', () => {
    it('renders a node for each entry in the nodes prop', () => {
      const wrapper = mount(TechLevelTree, {
        props: { name: 'Attack', nodes: nodes(['purchased', 'disabled', 'disabled']), interactive: false },
      })
      expect(wrapper.findAll('button, span.rounded-full').length).toBe(3)
    })

    it('shows the 1-based level number inside each node', () => {
      const wrapper = mount(TechLevelTree, {
        props: { name: 'Attack', nodes: nodes(['purchased', 'disabled']), interactive: false },
      })
      const circles = wrapper.findAll('button, span.rounded-full')
      expect(circles[0].text()).toBe('1')
      expect(circles[1].text()).toBe('2')
    })

    it('displays the tech name', () => {
      const wrapper = mount(TechLevelTree, {
        props: { name: 'Ship Size', nodes: nodes(['purchased']), interactive: false },
      })
      expect(wrapper.text()).toContain('Ship Size')
    })
  })

  describe('interactive mode', () => {
    it('renders purchasable nodes as buttons', () => {
      const wrapper = mount(TechLevelTree, {
        props: { name: 'Attack', nodes: nodes(['purchased', 'purchasable']), interactive: true },
      })
      expect(wrapper.findAll('button').length).toBe(1)
    })

    it('renders staged nodes as buttons', () => {
      const wrapper = mount(TechLevelTree, {
        props: { name: 'Attack', nodes: nodes(['purchased', 'staged']), interactive: true },
      })
      expect(wrapper.findAll('button').length).toBe(1)
    })

    it('does not render purchased or disabled nodes as buttons', () => {
      const wrapper = mount(TechLevelTree, {
        props: { name: 'Attack', nodes: nodes(['purchased', 'disabled', 'disabled']), interactive: true },
      })
      expect(wrapper.findAll('button').length).toBe(0)
    })

    it('emits nodeClicked with the node index when a purchasable node is clicked', async () => {
      const wrapper = mount(TechLevelTree, {
        props: { name: 'Attack', nodes: nodes(['purchased', 'purchasable', 'disabled']), interactive: true },
      })
      await wrapper.find('button').trigger('click')
      expect(wrapper.emitted('nodeClicked')).toEqual([[1]])
    })

    it('emits nodeClicked with the node index when a staged node is clicked', async () => {
      const wrapper = mount(TechLevelTree, {
        props: { name: 'Attack', nodes: nodes(['purchased', 'staged', 'disabled']), interactive: true },
      })
      await wrapper.find('button').trigger('click')
      expect(wrapper.emitted('nodeClicked')).toEqual([[1]])
    })

    it('does not emit nodeClicked when interactive is false', async () => {
      const wrapper = mount(TechLevelTree, {
        props: { name: 'Attack', nodes: nodes(['purchased', 'purchasable', 'disabled']), interactive: false },
      })
      expect(wrapper.findAll('button').length).toBe(0)
    })
  })

  describe('accessibility', () => {
    it('marks a staged button as pressed', () => {
      const wrapper = mount(TechLevelTree, {
        props: { name: 'Attack', nodes: nodes(['purchased', 'staged']), interactive: true },
      })
      expect(wrapper.find('button').attributes('aria-pressed')).toBe('true')
    })

    it('marks a purchasable button as not pressed', () => {
      const wrapper = mount(TechLevelTree, {
        props: { name: 'Attack', nodes: nodes(['purchased', 'purchasable']), interactive: true },
      })
      expect(wrapper.find('button').attributes('aria-pressed')).toBe('false')
    })

    it('includes cost in the aria-label on interactive buttons', () => {
      const wrapper = mount(TechLevelTree, {
        props: {
          name: 'Attack',
          nodes: [{ state: 'purchased' }, { state: 'purchasable', cost: 25 }],
          interactive: true,
        },
      })
      expect(wrapper.find('button').attributes('aria-label')).toContain('25 CP')
    })

    it('links non-interactive nodes with tooltip via aria-describedby when tooltip data is present', () => {
      const wrapper = mount(TechLevelTree, {
        props: {
          name: 'Attack',
          nodes: [{ state: 'purchased' }, { state: 'disabled', cost: 30, description: 'Enhanced weapons' }],
          interactive: false,
        },
      })
      const spans = wrapper.findAll('span.rounded-full')
      const tooltipId = spans[1].attributes('aria-describedby')
      expect(tooltipId).toBeTruthy()
      expect(wrapper.find(`#${tooltipId}`).exists()).toBe(true)
    })

    it('links interactive buttons with tooltip via aria-describedby when tooltip data is present', () => {
      const wrapper = mount(TechLevelTree, {
        props: {
          name: 'Attack',
          nodes: [{ state: 'purchased' }, { state: 'purchasable', cost: 25, description: 'Enhanced weapons' }],
          interactive: true,
        },
      })
      const button = wrapper.find('button')
      const tooltipId = button.attributes('aria-describedby')
      expect(tooltipId).toBeTruthy()
      expect(wrapper.find(`#${tooltipId}`).exists()).toBe(true)
    })

    it('omits aria-describedby when no tooltip data is present', () => {
      const wrapper = mount(TechLevelTree, {
        props: {
          name: 'Attack',
          nodes: [{ state: 'purchased' }, { state: 'disabled' }],
          interactive: false,
        },
      })
      const spans = wrapper.findAll('span.rounded-full')
      expect(spans[0].attributes('aria-describedby')).toBeUndefined()
      expect(spans[1].attributes('aria-describedby')).toBeUndefined()
    })

    it('makes non-interactive nodes with tooltips keyboard-focusable', () => {
      const wrapper = mount(TechLevelTree, {
        props: {
          name: 'Attack',
          nodes: [{ state: 'disabled', cost: 30 }],
          interactive: false,
        },
      })
      expect(wrapper.find('span.rounded-full').attributes('tabindex')).toBe('0')
    })

    it('omits tabindex on non-interactive nodes without tooltip data', () => {
      const wrapper = mount(TechLevelTree, {
        props: {
          name: 'Attack',
          nodes: [{ state: 'disabled' }],
          interactive: false,
        },
      })
      expect(wrapper.find('span.rounded-full').attributes('tabindex')).toBeUndefined()
    })

    it('shows info icon button when description prop is provided', () => {
      const wrapper = mount(TechLevelTree, {
        props: {
          name: 'Attack',
          description: 'Base attack rating for all ships.',
          nodes: [{ state: 'purchased' }],
          interactive: false,
        },
      })
      expect(wrapper.find('button[aria-label="Attack rule description"]').exists()).toBe(true)
    })

    it('omits info icon when no description prop is given', () => {
      const wrapper = mount(TechLevelTree, {
        props: {
          name: 'Attack',
          nodes: [{ state: 'purchased' }],
          interactive: false,
        },
      })
      expect(wrapper.find('button[aria-label="Attack rule description"]').exists()).toBe(false)
    })

    it('links the info icon button to its tooltip content via aria-describedby', () => {
      const wrapper = mount(TechLevelTree, {
        props: {
          name: 'Attack',
          description: 'Base attack rating for all ships.',
          nodes: [{ state: 'purchased' }],
          interactive: false,
        },
      })
      const infoButton = wrapper.find('button[aria-label="Attack rule description"]')
      const tooltipId = infoButton.attributes('aria-describedby')
      expect(tooltipId).toBeTruthy()
      expect(wrapper.find(`#${tooltipId}`).text()).toContain('Base attack rating for all ships.')
    })
  })
})