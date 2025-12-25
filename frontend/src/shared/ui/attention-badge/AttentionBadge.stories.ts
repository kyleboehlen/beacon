import type { Meta, StoryObj } from '@storybook/vue3-vite'
import AttentionBadge from './AttentionBadge.vue'

const meta: Meta<typeof AttentionBadge> = {
  title: 'Shared/AttentionBadge',
  component: AttentionBadge,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof AttentionBadge>

export const Red: Story = {
  render: () => ({
    components: { AttentionBadge },
    template: `
      <div class="w-48 h-48 bg-black p-8 flex items-center justify-center gap-8">
        <AttentionBadge variant="red" />
      </div>
    `,
  }),
}

export const Green: Story = {
  render: () => ({
    components: { AttentionBadge },
    template: `
      <div class="w-48 h-48 bg-black p-8 flex items-center justify-center gap-8">
        <AttentionBadge variant="green" />
      </div>
    `,
  }),
}

export const Yellow: Story = {
  render: () => ({
    components: { AttentionBadge },
    template: `
      <div class="w-48 h-48 bg-black p-8 flex items-center justify-center gap-8">
        <AttentionBadge variant="yellow" />
      </div>
    `,
  }),
}
