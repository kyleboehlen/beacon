import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import StepWizard from './StepWizard.vue'
import { BasicButton } from '@/shared/ui/basic-button'
import { Icon } from '@iconify/vue'

const meta: Meta<typeof StepWizard> = {
  title: 'Shared/StepWizard',
  component: StepWizard,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof StepWizard>

export const Default: Story = {
  render: () => ({
    components: { StepWizard },
    setup() {
      const steps = [
        { label: 'Personal Info', id: 'personal' },
        { label: 'Account Details', id: 'account' },
        { label: 'Confirmation', id: 'confirmation' },
      ]

      const isCompleted = ref(false)

      const handleComplete = () => {
        isCompleted.value = true
      }

      return { steps, handleComplete, isCompleted }
    },
    template: `
      <div class="bg-black p-8 h-[600px]">
        <div v-if="!isCompleted">
          <StepWizard :steps="steps" @completed="handleComplete">
            <template #personal>
              <div class="w-full h-full flex items-center justify-center bg-white/5 border-2 border-white/10 rounded-lg">
                <div class="text-center">
                  <h3 class="text-2xl font-bold text-white mb-4">Personal Information</h3>
                  <p class="text-white/70">Enter your personal details here</p>
                </div>
              </div>
            </template>
            <template #account>
              <div class="w-full h-full flex items-center justify-center bg-white/5 border-2 border-white/10 rounded-lg">
                <div class="text-center">
                  <h3 class="text-2xl font-bold text-white mb-4">Account Details</h3>
                  <p class="text-white/70">Set up your account credentials</p>
                </div>
              </div>
            </template>
            <template #confirmation>
              <div class="w-full h-full flex items-center justify-center bg-white/5 border-2 border-white/10 rounded-lg">
                <div class="text-center">
                  <h3 class="text-2xl font-bold text-white mb-4">Confirmation</h3>
                  <p class="text-white/70">Review and confirm your information</p>
                </div>
              </div>
            </template>
          </StepWizard>
        </div>
        <div v-else class="flex items-center justify-center h-full">
          <div class="text-center">
            <h2 class="text-3xl font-bold text-green-400 mb-2">Wizard Completed!</h2>
            <p class="text-white/70">All steps have been finished successfully.</p>
          </div>
        </div>
      </div>
    `,
  }),
}

export const ManySteps: Story = {
  render: () => ({
    components: { StepWizard },
    setup() {
      const steps = [
        { label: 'Start', id: 'start' },
        { label: 'Step 2', id: 'step2' },
        { label: 'Step 3', id: 'step3' },
        { label: 'Step 4', id: 'step4' },
        { label: 'Step 5', id: 'step5' },
        { label: 'Finish', id: 'finish' },
      ]

      const isCompleted = ref(false)

      const handleComplete = () => {
        isCompleted.value = true
      }

      return { steps, handleComplete, isCompleted }
    },
    template: `
      <div class="bg-black p-8 h-[600px]">
        <div v-if="!isCompleted">
          <StepWizard :steps="steps" @completed="handleComplete">
            <template #start>
              <div class="w-full h-full flex items-center justify-center bg-white/5 border-2 border-white/10 rounded-lg">
                <h3 class="text-xl text-white">Step 1: Getting Started</h3>
              </div>
            </template>
            <template #step2>
              <div class="w-full h-full flex items-center justify-center bg-white/5 border-2 border-white/10 rounded-lg">
                <h3 class="text-xl text-white">Step 2</h3>
              </div>
            </template>
            <template #step3>
              <div class="w-full h-full flex items-center justify-center bg-white/5 border-2 border-white/10 rounded-lg">
                <h3 class="text-xl text-white">Step 3</h3>
              </div>
            </template>
            <template #step4>
              <div class="w-full h-full flex items-center justify-center bg-white/5 border-2 border-white/10 rounded-lg">
                <h3 class="text-xl text-white">Step 4</h3>
              </div>
            </template>
            <template #step5>
              <div class="w-full h-full flex items-center justify-center bg-white/5 border-2 border-white/10 rounded-lg">
                <h3 class="text-xl text-white">Step 5</h3>
              </div>
            </template>
            <template #finish>
              <div class="w-full h-full flex items-center justify-center bg-white/5 border-2 border-white/10 rounded-lg">
                <h3 class="text-xl text-white">Final Step: Complete!</h3>
              </div>
            </template>
          </StepWizard>
        </div>
        <div v-else class="flex items-center justify-center h-full">
          <div class="text-center">
            <h2 class="text-3xl font-bold text-green-400 mb-2">Wizard Completed!</h2>
            <p class="text-white/70">All steps have been finished successfully.</p>
          </div>
        </div>
      </div>
    `,
  }),
}

export const WithFormContent: Story = {
  render: () => ({
    components: { StepWizard },
    setup() {
      const steps = [
        { label: 'Basic Info', id: 'basic' },
        { label: 'Preferences', id: 'preferences' },
        { label: 'Review', id: 'review' },
      ]

      const formData = ref({
        name: '',
        email: '',
        theme: 'dark',
        notifications: true,
      })

      const isCompleted = ref(false)

      const handleComplete = () => {
        console.log('Form submitted:', formData.value)
        isCompleted.value = true
      }

      return { steps, formData, handleComplete, isCompleted }
    },
    template: `
      <div class="bg-black p-8 h-[600px]">
        <div v-if="!isCompleted">
          <StepWizard :steps="steps" @completed="handleComplete">
          <template #basic>
            <div class="w-full h-full p-6 bg-white/5 border-2 border-white/10 rounded-lg overflow-auto">
              <h3 class="text-2xl font-bold text-white mb-6">Basic Information</h3>
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-white/70 mb-2">Name</label>
                  <input
                    v-model="formData.name"
                    type="text"
                    class="w-full px-4 py-2 bg-white/10 border-2 border-white/20 rounded text-white placeholder-white/50 focus:outline-none focus:border-blue-500"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-white/70 mb-2">Email</label>
                  <input
                    v-model="formData.email"
                    type="email"
                    class="w-full px-4 py-2 bg-white/10 border-2 border-white/20 rounded text-white placeholder-white/50 focus:outline-none focus:border-blue-500"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
            </div>
          </template>
          <template #preferences>
            <div class="w-full h-full p-6 bg-white/5 border-2 border-white/10 rounded-lg overflow-auto">
              <h3 class="text-2xl font-bold text-white mb-6">Preferences</h3>
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-white/70 mb-2">Theme</label>
                  <select
                    v-model="formData.theme"
                    class="w-full px-4 py-2 bg-white/10 border-2 border-white/20 rounded text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="dark">Dark</option>
                    <option value="light">Light</option>
                  </select>
                </div>
                <div class="flex items-center gap-3">
                  <input
                    v-model="formData.notifications"
                    type="checkbox"
                    id="notifications"
                    class="w-5 h-5 bg-white/10 border-2 border-white/20 rounded"
                  />
                  <label for="notifications" class="text-sm font-medium text-white/70">
                    Enable notifications
                  </label>
                </div>
              </div>
            </div>
          </template>
          <template #review>
            <div class="w-full h-full p-6 bg-white/5 border-2 border-white/10 rounded-lg overflow-auto">
              <h3 class="text-2xl font-bold text-white mb-6">Review Your Information</h3>
              <div class="space-y-3">
                <div class="p-4 bg-white/5 rounded">
                  <p class="text-sm text-white/50">Name</p>
                  <p class="text-white font-medium">{{ formData.name || 'Not provided' }}</p>
                </div>
                <div class="p-4 bg-white/5 rounded">
                  <p class="text-sm text-white/50">Email</p>
                  <p class="text-white font-medium">{{ formData.email || 'Not provided' }}</p>
                </div>
                <div class="p-4 bg-white/5 rounded">
                  <p class="text-sm text-white/50">Theme</p>
                  <p class="text-white font-medium">{{ formData.theme }}</p>
                </div>
                <div class="p-4 bg-white/5 rounded">
                  <p class="text-sm text-white/50">Notifications</p>
                  <p class="text-white font-medium">{{ formData.notifications ? 'Enabled' : 'Disabled' }}</p>
                </div>
              </div>
            </div>
          </template>
        </StepWizard>
        </div>
        <div v-else class="flex items-center justify-center h-full">
          <div class="text-center">
            <h2 class="text-3xl font-bold text-green-400 mb-2">Form Submitted!</h2>
            <p class="text-white/70 mb-4">Your information has been saved successfully.</p>
            <p class="text-white/50 text-sm">Check the console for submitted data.</p>
          </div>
        </div>
      </div>
    `,
  }),
}

export const CustomButtons: Story = {
  render: () => ({
    components: { StepWizard, BasicButton, Icon },
    setup() {
      const steps = [
        { label: 'Step 1', id: 'step1' },
        { label: 'Step 2', id: 'step2' },
        { label: 'Step 3', id: 'step3' },
      ]

      const isCompleted = ref(false)

      const handleComplete = () => {
        isCompleted.value = true
      }

      return { steps, handleComplete, isCompleted }
    },
    template: `
      <div class="bg-black p-8 h-[600px]">
        <div v-if="!isCompleted">
          <StepWizard :steps="steps" @completed="handleComplete">
            <!-- Custom Back Button -->
            <template #back-button="{ handleBack, isFirstStep }">
              <BasicButton
                :disabled="isFirstStep"
                @click="handleBack"
                aria-label="Previous step"
                class="bg-red-500/20 hover:bg-red-500/30 border-red-500/50"
              >
                <div class="flex flex-row items-center justify-center h-full">
                  <Icon icon="mdi:arrow-left-circle" class="size-6" aria-hidden="true" />
                  <p class="ml-2">Previous</p>
                </div>
              </BasicButton>
            </template>

            <!-- Custom Next/Finish Button -->
            <template #next-button="{ handleNext, handleFinish, isLastStep }">
              <BasicButton
                v-if="!isLastStep"
                @click="handleNext"
                aria-label="Next step"
                class="bg-green-500/20 hover:bg-green-500/30 border-green-500/50"
              >
                <div class="flex flex-row items-center justify-center h-full">
                  <p class="mr-2">Continue</p>
                  <Icon icon="mdi:arrow-right-circle" class="size-6" aria-hidden="true" />
                </div>
              </BasicButton>

              <BasicButton
                v-else
                @click="handleFinish"
                aria-label="Complete wizard"
                class="bg-blue-500/20 hover:bg-blue-500/30 border-blue-500/50"
              >
                <div class="flex flex-row items-center justify-center h-full">
                  <Icon icon="mdi:check-circle" class="size-6 mr-2" aria-hidden="true" />
                  <p>Complete</p>
                </div>
              </BasicButton>
            </template>

            <template #step1>
              <div class="w-full h-full flex items-center justify-center bg-white/5 border-2 border-white/10 rounded-lg">
                <div class="text-center">
                  <h3 class="text-2xl font-bold text-white mb-4">Custom Buttons Example</h3>
                  <p class="text-white/70">This wizard uses custom styled buttons</p>
                </div>
              </div>
            </template>
            <template #step2>
              <div class="w-full h-full flex items-center justify-center bg-white/5 border-2 border-white/10 rounded-lg">
                <h3 class="text-xl text-white">Step 2 Content</h3>
              </div>
            </template>
            <template #step3>
              <div class="w-full h-full flex items-center justify-center bg-white/5 border-2 border-white/10 rounded-lg">
                <h3 class="text-xl text-white">Step 3 Content</h3>
              </div>
            </template>
          </StepWizard>
        </div>
        <div v-else class="flex items-center justify-center h-full">
          <div class="text-center">
            <h2 class="text-3xl font-bold text-green-400 mb-2">Wizard Completed!</h2>
            <p class="text-white/70">Custom button styling preserved throughout.</p>
          </div>
        </div>
      </div>
    `,
  }),
}
