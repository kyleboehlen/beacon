import { describe, it, expect, beforeEach } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import StepWizard from './StepWizard.vue'

describe('StepWizard', () => {
  const steps = [
    { label: 'Step 1', id: 'step1' },
    { label: 'Step 2', id: 'step2' },
    { label: 'Step 3', id: 'step3' },
  ]

  let wrapper: VueWrapper

  beforeEach(() => {
    wrapper = mount(StepWizard, {
      props: {
        steps,
      },
      slots: {
        step1: '<div data-testid="content-1">Step 1 Content</div>',
        step2: '<div data-testid="content-2">Step 2 Content</div>',
        step3: '<div data-testid="content-3">Step 3 Content</div>',
      },
    })
  })

  describe('Rendering', () => {
    it('renders all step labels', () => {
      const stepLabels = wrapper.findAll('li span.ms-2')
      expect(stepLabels).toHaveLength(3)
      expect(stepLabels[0].text()).toBe('Step 1')
      expect(stepLabels[1].text()).toBe('Step 2')
      expect(stepLabels[2].text()).toBe('Step 3')
    })

    it('renders step numbers for incomplete steps', () => {
      const stepIndicators = wrapper.findAll('li span.size-7 span')
      expect(stepIndicators[0].text()).toBe('1')
      expect(stepIndicators[1].text()).toBe('2')
      expect(stepIndicators[2].text()).toBe('3')
    })

    it('displays only the current step content', () => {
      expect(wrapper.find('[data-testid="content-1"]').isVisible()).toBe(true)
      expect(wrapper.find('[data-testid="content-2"]').isVisible()).toBe(false)
      expect(wrapper.find('[data-testid="content-3"]').isVisible()).toBe(false)
    })

    it('renders Back and Next buttons initially', () => {
      const buttons = wrapper.findAllComponents({ name: 'BasicButton' })
      expect(buttons).toHaveLength(2)
      expect(buttons[0].text()).toContain('Back')
      expect(buttons[1].text()).toContain('Next')
    })
  })

  describe('Navigation', () => {
    it('disables Back button on first step', () => {
      const backButton = wrapper.findAllComponents({ name: 'BasicButton' })[0]
      expect(backButton.props('disabled')).toBe(true)
    })

    it('enables Back button after moving forward', async () => {
      const nextButton = wrapper.findAllComponents({ name: 'BasicButton' })[1]
      await nextButton.trigger('click')

      const backButton = wrapper.findAllComponents({ name: 'BasicButton' })[0]
      expect(backButton.props('disabled')).toBe(false)
    })

    it('advances to next step when Next is clicked', async () => {
      const nextButton = wrapper.findAllComponents({ name: 'BasicButton' })[1]
      await nextButton.trigger('click')

      expect(wrapper.find('[data-testid="content-1"]').isVisible()).toBe(false)
      expect(wrapper.find('[data-testid="content-2"]').isVisible()).toBe(true)
    })

    it('goes back to previous step when Back is clicked', async () => {
      const buttons = wrapper.findAllComponents({ name: 'BasicButton' })
      const nextButton = buttons[1]
      const backButton = buttons[0]

      await nextButton.trigger('click')
      expect(wrapper.find('[data-testid="content-2"]').isVisible()).toBe(true)

      await backButton.trigger('click')
      expect(wrapper.find('[data-testid="content-1"]').isVisible()).toBe(true)
    })

    it('shows Finish button on last step', async () => {
      const nextButton = wrapper.findAllComponents({ name: 'BasicButton' })[1]

      await nextButton.trigger('click')
      await nextButton.trigger('click')

      const buttons = wrapper.findAllComponents({ name: 'BasicButton' })
      expect(buttons).toHaveLength(2) // Back and Finish
      expect(buttons[1].text()).toContain('Finish')
    })

    it('emits completed event when Finish is clicked', async () => {
      const nextButton = wrapper.findAllComponents({ name: 'BasicButton' })[1]

      // Navigate to last step
      await nextButton.trigger('click')
      await nextButton.trigger('click')

      // Click Finish button
      const finishButton = wrapper.findAllComponents({ name: 'BasicButton' })[1]
      await finishButton.trigger('click')

      expect(wrapper.emitted('completed')).toBeTruthy()
      expect(wrapper.emitted('completed')).toHaveLength(1)
    })
  })

  describe('Step Completion Tracking', () => {
    it('marks steps as complete when moving forward', async () => {
      const nextButton = wrapper.findAllComponents({ name: 'BasicButton' })[1]

      // Move to step 2
      await nextButton.trigger('click')

      // Check if step 1 shows checkmark icon
      const step1Indicator = wrapper.findAll('li')[0]
      const checkIcon = step1Indicator.find('svg')
      expect(checkIcon.exists()).toBe(true)
    })

    it('does not mark current step as complete', async () => {
      const nextButton = wrapper.findAllComponents({ name: 'BasicButton' })[1]

      // Move to step 2
      await nextButton.trigger('click')

      // Check that step 2 still shows number (no checkmark)
      const step2Indicator = wrapper.findAll('li')[1]
      const checkIcon = step2Indicator.find('svg')
      expect(checkIcon.exists()).toBe(false)

      // Should show the number instead
      const numberSpan = step2Indicator.find('span.size-7 span')
      expect(numberSpan.exists()).toBe(true)
      expect(numberSpan.text()).toBe('2')
    })

    it('marks steps as not complete when going backwards', async () => {
      const buttons = wrapper.findAllComponents({ name: 'BasicButton' })
      const nextButton = buttons[1]
      const backButton = buttons[0]

      // Move forward then backward
      await nextButton.trigger('click')
      await backButton.trigger('click')

      // Step 1 should no longer be marked complete (should show number instead of checkmark)
      const step1Indicator = wrapper.findAll('li')[0]
      const checkIcon = step1Indicator.find('svg')
      expect(checkIcon.exists()).toBe(false)

      // Should show the step number instead
      const numberSpan = step1Indicator.find('span.size-7 span')
      expect(numberSpan.exists()).toBe(true)
      expect(numberSpan.text()).toBe('1')
    })
  })

  describe('Step Clicking', () => {
    it('allows clicking on completed steps to navigate back', async () => {
      const nextButton = wrapper.findAllComponents({ name: 'BasicButton' })[1]

      // Move to step 3
      await nextButton.trigger('click')
      await nextButton.trigger('click')

      // Click on step 1
      const step1 = wrapper.findAll('li')[0]
      await step1.trigger('click')

      expect(wrapper.find('[data-testid="content-1"]').isVisible()).toBe(true)
    })

    it('marks future steps as not complete when clicking back', async () => {
      const nextButton = wrapper.findAllComponents({ name: 'BasicButton' })[1]

      // Move to step 3
      await nextButton.trigger('click')
      await nextButton.trigger('click')

      // Verify steps 1 and 2 are marked complete
      let step1Indicator = wrapper.findAll('li')[0]
      let step2Indicator = wrapper.findAll('li')[1]
      expect(step1Indicator.find('svg').exists()).toBe(true)
      expect(step2Indicator.find('svg').exists()).toBe(true)

      // Click on step 1
      const step1 = wrapper.findAll('li')[0]
      await step1.trigger('click')

      // Steps 1 and 2 should no longer be marked complete
      step1Indicator = wrapper.findAll('li')[0]
      step2Indicator = wrapper.findAll('li')[1]
      expect(step1Indicator.find('svg').exists()).toBe(false)
      expect(step2Indicator.find('svg').exists()).toBe(false)
    })

    it('does not allow clicking on future steps', async () => {
      const step3 = wrapper.findAll('li')[2]
      await step3.trigger('click')

      // Should still be on step 1
      expect(wrapper.find('[data-testid="content-1"]').isVisible()).toBe(true)
    })

    it('allows keyboard navigation on completed steps with Enter', async () => {
      const nextButton = wrapper.findAllComponents({ name: 'BasicButton' })[1]

      // Move to step 2
      await nextButton.trigger('click')

      // Press Enter on step 1
      const step1 = wrapper.findAll('li')[0]
      await step1.trigger('keydown.enter')

      expect(wrapper.find('[data-testid="content-1"]').isVisible()).toBe(true)
    })

    it('allows keyboard navigation on completed steps with Space', async () => {
      const nextButton = wrapper.findAllComponents({ name: 'BasicButton' })[1]

      // Move to step 2
      await nextButton.trigger('click')

      // Press Space on step 1
      const step1 = wrapper.findAll('li')[0]
      await step1.trigger('keydown.space')

      expect(wrapper.find('[data-testid="content-1"]').isVisible()).toBe(true)
    })
  })

  describe('Accessibility', () => {
    it('has nav with aria-label on wizard steps container', () => {
      const nav = wrapper.find('nav[aria-label="Wizard steps"]')
      expect(nav.exists()).toBe(true)
    })

    it('renders list items for all steps', () => {
      const stepItems = wrapper.findAll('ol li')
      expect(stepItems).toHaveLength(3)
    })

    it('sets aria-current="step" on current step', () => {
      const step1 = wrapper.findAll('li')[0]
      expect(step1.attributes('aria-current')).toBe('step')
    })

    it('updates aria-current when navigating', async () => {
      const nextButton = wrapper.findAllComponents({ name: 'BasicButton' })[1]
      await nextButton.trigger('click')

      const step1 = wrapper.findAll('li')[0]
      const step2 = wrapper.findAll('li')[1]

      expect(step1.attributes('aria-current')).toBeUndefined()
      expect(step2.attributes('aria-current')).toBe('step')
    })

    it('has proper aria-label on steps', () => {
      const step1 = wrapper.findAll('li')[0]
      expect(step1.attributes('aria-label')).toContain('Step 1')
      expect(step1.attributes('aria-label')).toContain('Current')
    })

    it('updates aria-label to include "Completed" for completed steps', async () => {
      const nextButton = wrapper.findAllComponents({ name: 'BasicButton' })[1]
      await nextButton.trigger('click')

      const step1 = wrapper.findAll('li')[0]
      expect(step1.attributes('aria-label')).toContain('Completed')
    })

    it('has tabindex=0 for completed steps (clickable)', async () => {
      const nextButton = wrapper.findAllComponents({ name: 'BasicButton' })[1]
      await nextButton.trigger('click')

      const step1 = wrapper.findAll('li')[0]
      expect(step1.attributes('tabindex')).toBe('0')
    })

    it('has tabindex=-1 for future steps (not clickable)', () => {
      const step2 = wrapper.findAll('li')[1]
      const step3 = wrapper.findAll('li')[2]

      expect(step2.attributes('tabindex')).toBe('-1')
      expect(step3.attributes('tabindex')).toBe('-1')
    })

    it('has role="region" for each step content area', () => {
      const regions = wrapper.findAll('div[role="region"]')
      expect(regions).toHaveLength(3)
    })

    it('has aria-labelledby on content panels referencing step label', () => {
      const regions = wrapper.findAll('[role="region"]')
      expect(regions[0].attributes('aria-labelledby')).toBe('step-step1-label')
    })

    it('has screen reader announcement area', () => {
      const srOnly = wrapper.find('div[role="status"][aria-live="polite"]')
      expect(srOnly.exists()).toBe(true)
      expect(srOnly.text()).toContain('Step 1 of 3: Step 1')
    })

    it('updates screen reader announcement when step changes', async () => {
      const nextButton = wrapper.findAllComponents({ name: 'BasicButton' })[1]
      await nextButton.trigger('click')

      const srOnly = wrapper.find('div[role="status"][aria-live="polite"]')
      expect(srOnly.text()).toContain('Step 2 of 3: Step 2')
    })
  })

  describe('Edge Cases', () => {
    it('handles two-step wizard correctly', () => {
      const twoStepWrapper = mount(StepWizard, {
        props: {
          steps: [
            { label: 'First', id: 'first' },
            { label: 'Last', id: 'last' },
          ],
        },
        slots: {
          first: '<div>First</div>',
          last: '<div>Last</div>',
        },
      })

      const buttons = twoStepWrapper.findAllComponents({ name: 'BasicButton' })
      expect(buttons).toHaveLength(2)
      expect(buttons[1].text()).toContain('Next')
    })

    it('handles single-step wizard correctly', () => {
      const singleStepWrapper = mount(StepWizard, {
        props: {
          steps: [{ label: 'Only Step', id: 'only' }],
        },
        slots: {
          only: '<div>Only content</div>',
        },
      })

      const buttons = singleStepWrapper.findAllComponents({ name: 'BasicButton' })
      expect(buttons).toHaveLength(2) // Back (disabled) and Finish
      expect(buttons[0].props('disabled')).toBe(true)
      expect(buttons[1].text()).toContain('Finish')
    })

    it('applies w-full h-full classes to container', () => {
      expect(wrapper.classes()).toContain('w-full')
      expect(wrapper.classes()).toContain('h-full')
    })
  })

  describe('Custom Button Slots', () => {
    it('uses default back button when no slot provided', () => {
      const backButton = wrapper.findAllComponents({ name: 'BasicButton' })[0]
      expect(backButton.text()).toContain('Back')
    })

    it('uses default next button when no slot provided', () => {
      const nextButton = wrapper.findAllComponents({ name: 'BasicButton' })[1]
      expect(nextButton.text()).toContain('Next')
    })

    it('uses custom back button when slot provided', () => {
      const customWrapper = mount(StepWizard, {
        props: { steps },
        slots: {
          step1: '<div>Step 1</div>',
          step2: '<div>Step 2</div>',
          step3: '<div>Step 3</div>',
          'back-button': '<button data-testid="custom-back">Custom Back</button>',
        },
      })

      const customBackButton = customWrapper.find('[data-testid="custom-back"]')
      expect(customBackButton.exists()).toBe(true)
      expect(customBackButton.text()).toBe('Custom Back')
    })

    it('uses custom next button when slot provided', () => {
      const customWrapper = mount(StepWizard, {
        props: { steps },
        slots: {
          step1: '<div>Step 1</div>',
          step2: '<div>Step 2</div>',
          step3: '<div>Step 3</div>',
          'next-button': '<button data-testid="custom-next">Custom Next</button>',
        },
      })

      const customNextButton = customWrapper.find('[data-testid="custom-next"]')
      expect(customNextButton.exists()).toBe(true)
      expect(customNextButton.text()).toBe('Custom Next')
    })

    it('passes correct props to back button slot', () => {
      const customWrapper = mount(StepWizard, {
        props: { steps },
        slots: {
          step1: '<div>Step 1</div>',
          step2: '<div>Step 2</div>',
          step3: '<div>Step 3</div>',
          'back-button': `
            <template #back-button="{ handleBack, isFirstStep, currentStep }">
              <button
                data-testid="custom-back"
                :disabled="isFirstStep"
                @click="handleBack"
              >
                Back (Step {{ currentStep }})
              </button>
            </template>
          `,
        },
      })

      const customBackButton = customWrapper.find('[data-testid="custom-back"]')
      expect(customBackButton.exists()).toBe(true)
    })

    it('passes correct props to next button slot', () => {
      const customWrapper = mount(StepWizard, {
        props: { steps },
        slots: {
          step1: '<div>Step 1</div>',
          step2: '<div>Step 2</div>',
          step3: '<div>Step 3</div>',
          'next-button': `
            <template #next-button="{ handleNext, handleFinish, isLastStep }">
              <button
                v-if="!isLastStep"
                data-testid="custom-next"
                @click="handleNext"
              >
                Continue
              </button>
              <button
                v-else
                data-testid="custom-finish"
                @click="handleFinish"
              >
                Done
              </button>
            </template>
          `,
        },
      })

      const customNextButton = customWrapper.find('[data-testid="custom-next"]')
      expect(customNextButton.exists()).toBe(true)
    })
  })
})
