import type { Meta, StoryObj } from '@storybook/vue3-vite'
import StarryBackground from './StarryBackground.vue'

const meta = {
  title: 'shared/ui/StarryBackground',
  component: StarryBackground,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof StarryBackground>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: { StarryBackground },
    template: '<StarryBackground class="w-full [height:75vh]" />',
  }),
}

export const WithContent: Story = {
  render: () => ({
    components: { StarryBackground },
    template: `
      <StarryBackground class="w-full flex items-center justify-center">
        <div class="text-center text-white my-32">
          <h1 class="text-4xl font-bold">Welcome</h1>
          <p class="text-lg mt-2">Content over starry background</p>
        </div>
      </StarryBackground>
    `,
  }),
}
