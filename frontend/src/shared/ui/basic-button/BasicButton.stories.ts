import type { Meta, StoryObj } from '@storybook/vue3-vite'
import BasicButton from './BasicButton.vue'

const meta: Meta<typeof BasicButton> = {
  title: 'Shared/BasicButton',
  component: BasicButton,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof BasicButton>

export const Default: Story = {
  render: () => ({
    components: { BasicButton },
    template: `
      <div class="bg-black p-8">
        <BasicButton class="w-32 h-16">Click Me</BasicButton>
      </div>
    `,
  }),
}

export const Disabled: Story = {
  render: () => ({
    components: { BasicButton },
    template: `
      <div class="bg-black p-8 space-y-4">
        <BasicButton class="w-32 h-16" :disabled="true">Disabled</BasicButton>
        <BasicButton class="w-32 h-16" :disabled="false">Enabled</BasicButton>
      </div>
    `,
  }),
}

export const ColorVariants: Story = {
  render: () => ({
    components: { BasicButton },
    template: `
      <div class="bg-black p-8 space-y-4">
        <div class="flex gap-4">
          <BasicButton class="w-32 h-16">Default</BasicButton>
          <BasicButton class="w-32 h-16" inner-styles="bg-red-900 hover:bg-red-800">Red</BasicButton>
          <BasicButton class="w-32 h-16" inner-styles="bg-blue-900 hover:bg-blue-800">Blue</BasicButton>
          <BasicButton class="w-32 h-16" inner-styles="bg-green-900 hover:bg-green-800">Green</BasicButton>
        </div>
      </div>
    `,
  }),
}

// TODO: Icons, Sizes examples
