import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import RuleReferenceLink from './RuleReferenceLink.vue'

describe('RuleReferenceLink', () => {
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

  describe('Link behavior', () => {
    it('has href pointing to PDF viewer', () => {
      const wrapper = mount(RuleReferenceLink, {
        props: { referenceNumber: '5.0' },
      })

      expect(wrapper.attributes('href')).toContain('/pdfjs/web/viewer.html')
      expect(wrapper.attributes('href')).toContain('%2FSE_AllGoodTHings_MasterRulebook_v8.pdf')
    })

    it('includes page fragment when page prop is provided', () => {
      const wrapper = mount(RuleReferenceLink, {
        props: { referenceNumber: '5.0', page: 42 },
      })

      expect(wrapper.attributes('href')).toContain('#page=42')
    })

    it('opens in new tab', () => {
      const wrapper = mount(RuleReferenceLink, {
        props: { referenceNumber: '5.0' },
      })

      expect(wrapper.attributes('target')).toBe('_blank')
      expect(wrapper.attributes('rel')).toContain('noopener')
    })
  })

  describe('Accessibility', () => {
    it('is a native anchor element', () => {
      const wrapper = mount(RuleReferenceLink, {
        props: { referenceNumber: '5.0' },
      })
      expect(wrapper.element.tagName.toLowerCase()).toBe('a')
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