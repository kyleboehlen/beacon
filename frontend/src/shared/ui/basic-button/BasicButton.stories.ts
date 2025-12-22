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
        <BasicButton>Click Me</BasicButton>
      </div>
    `,
  }),
}

export const Disabled: Story = {
  render: () => ({
    components: { BasicButton },
    template: `
      <div class="bg-black p-8 space-y-4">
        <BasicButton :disabled="true">Disabled</BasicButton>
        <BasicButton :disabled="false">Enabled</BasicButton>
      </div>
    `,
  }),
}

export const MultipleButtons: Story = {
  render: () => ({
    components: { BasicButton },
    template: `
      <div class="bg-black p-8">
        <div class="flex gap-4">
          <BasicButton class="w-32 !bg-blue-500/10 text-blue-300 hover:!bg-blue-500/20 hover:!border-b-blue-500">Blue</BasicButton>
          <BasicButton class="w-32 !bg-red-500/10 text-red-300 hover:!bg-red-500/20 hover:!border-b-red-500">Red</BasicButton>
          <BasicButton class="w-32 !bg-green-500/10 text-green-300 hover:!bg-green-500/20 hover:!border-b-green-500">Green</BasicButton>
          <BasicButton :disabled="true">Disabled</BasicButton>
        </div>
      </div>
    `,
  }),
}

// TODO: Icons, Sizes examples
