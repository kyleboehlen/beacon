import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import RuleReferenceLink from './RuleReferenceLink.vue'

describe('RuleReferenceLink', () => {
  let windowOpenSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    windowOpenSpy = vi.spyOn(window, 'open').mockImplementation(() => null)
  })

  describe('Rendering', () => {
    it('displays the reference number by default', () => {
      const wrapper = mount(RuleReferenceLink, {
        props: { referenceNumber: '5.1.2' },
      })
      expect(wrapper.text()).toBe('5.1.2')
    })

    it('displays slot content when provided', () => {
      const wrapper = mount(RuleReferenceLink, {
        props: { referenceNumber: '5.1.2' },
        slots: { default: 'Rule 5.1.2' },
      })
      expect(wrapper.text()).toBe('Rule 5.1.2')
    })

    it('falls back to reference number when no slot content', () => {
      const wrapper = mount(RuleReferenceLink, {
        props: { referenceNumber: '8.3' },
      })
      expect(wrapper.text()).toBe('8.3')
    })
  })

  describe('Click behavior', () => {
    it('opens PDF in new tab on click', async () => {
      const wrapper = mount(RuleReferenceLink, {
        props: { referenceNumber: '5.0' },
      })

      await wrapper.trigger('click')
      expect(windowOpenSpy).toHaveBeenCalledWith(
        '/pdfjs/web/viewer.html?file=%2FSE_AllGoodTHings_MasterRulebook_v8.pdf',
        '_blank',
        'noopener',
      )
    })

    it('opens PDF at specific page when page prop is provided', async () => {
      const wrapper = mount(RuleReferenceLink, {
        props: { referenceNumber: '5.0', page: 42 },
      })

      await wrapper.trigger('click')
      expect(windowOpenSpy).toHaveBeenCalledWith(
        '/pdfjs/web/viewer.html?file=%2FSE_AllGoodTHings_MasterRulebook_v8.pdf#page=42',
        '_blank',
        'noopener',
      )
    })
  })

  describe('Keyboard navigation', () => {
    it('opens PDF on Enter key', async () => {
      const wrapper = mount(RuleReferenceLink, {
        props: { referenceNumber: '5.0' },
      })

      await wrapper.trigger('keydown', { key: 'Enter' })
      expect(windowOpenSpy).toHaveBeenCalled()
    })

    it('opens PDF on Space key', async () => {
      const wrapper = mount(RuleReferenceLink, {
        props: { referenceNumber: '5.0' },
      })

      await wrapper.trigger('keydown', { key: ' ' })
      expect(windowOpenSpy).toHaveBeenCalled()
    })

    it('does not open PDF on other keys', async () => {
      const wrapper = mount(RuleReferenceLink, {
        props: { referenceNumber: '5.0' },
      })

      await wrapper.trigger('keydown', { key: 'Tab' })
      expect(windowOpenSpy).not.toHaveBeenCalled()
    })
  })

  describe('Accessibility', () => {
    it('has role="link"', () => {
      const wrapper = mount(RuleReferenceLink, {
        props: { referenceNumber: '5.0' },
      })
      expect(wrapper.attributes('role')).toBe('link')
    })

    it('has tabindex="0"', () => {
      const wrapper = mount(RuleReferenceLink, {
        props: { referenceNumber: '5.0' },
      })
      expect(wrapper.attributes('tabindex')).toBe('0')
    })

    it('has aria-label with reference number', () => {
      const wrapper = mount(RuleReferenceLink, {
        props: { referenceNumber: '5.0' },
      })
      expect(wrapper.attributes('aria-label')).toContain('5.0')
      expect(wrapper.attributes('aria-label')).toContain('rulebook PDF')
    })
  })
})