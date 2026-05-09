import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Badge from './Badge.vue'

const meta: Meta<typeof Badge> = {
  title: 'Shared/Badge',
  component: Badge,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Badge>

export const AllVariants: Story = {
  render: () => ({
    components: { Badge },
    template: `
      <div class="bg-black p-8 flex flex-wrap items-center gap-3">
        <Badge variant="default">Default</Badge>
        <Badge variant="cyan">Cyan</Badge>
        <Badge variant="green">Green</Badge>
        <Badge variant="yellow">Yellow</Badge>
        <Badge variant="red">Red</Badge>
      </div>
    `,
  }),
}
