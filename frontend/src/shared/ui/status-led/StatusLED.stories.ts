import type { Meta, StoryObj } from '@storybook/vue3-vite'
import StatusLED from './StatusLED.vue'

const meta: Meta<typeof StatusLED> = {
  title: 'Shared/StatusLED',
  component: StatusLED,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof StatusLED>

export const AllVariants: Story = {
  render: () => ({
    components: { StatusLED },
    template: `
      <div class="bg-black p-8 space-y-6">
        <div class="flex items-center gap-4">
          <StatusLED variant="red" />
          <span class="text-white">Red Status</span>
        </div>
        <div class="flex items-center gap-4">
          <StatusLED variant="yellow" />
          <span class="text-white">Yellow Status</span>
        </div>
        <div class="flex items-center gap-4">
          <StatusLED variant="green" />
          <span class="text-white">Green Status</span>
        </div>
      </div>
    `,
  }),
}

export const AllSizes: Story = {
  render: () => ({
    components: { StatusLED },
    template: `
      <div class="bg-black p-8 space-y-6">
        <div class="flex items-center gap-4">
          <StatusLED class="!size-2" variant="green" />
          <span class="text-white">Small</span>
        </div>
        <div class="flex items-center gap-4">
          <StatusLED variant="green" />
          <span class="text-white">Medium (default)</span>
        </div>
        <div class="flex items-center gap-4">
          <StatusLED class="!size-4" variant="green" />
          <span class="text-white">Large</span>
        </div>
      </div>
    `,
  }),
}

export const StatusPanel: Story = {
  render: () => ({
    components: { StatusLED },
    template: `
      <div class="bg-black p-8">
        <div class="border border-white/20 rounded-lg p-6 space-y-4 max-w-md">
          <h3 class="text-white font-bold text-lg mb-4">System Status</h3>

          <div class="flex items-center justify-between">
            <span class="text-gray-300">Power Supply</span>
            <div class="flex items-center gap-2">
              <StatusLED variant="green" />
              <span class="text-green-400 text-sm">Online</span>
            </div>
          </div>

          <div class="flex items-center justify-between">
            <span class="text-gray-300">Network Connection</span>
            <div class="flex items-center gap-2">
              <StatusLED variant="yellow" />
              <span class="text-yellow-400 text-sm">Unstable</span>
            </div>
          </div>

          <div class="flex items-center justify-between">
            <span class="text-gray-300">Database</span>
            <div class="flex items-center gap-2">
              <StatusLED variant="red" />
              <span class="text-red-400 text-sm">Error</span>
            </div>
          </div>

          <div class="flex items-center justify-between">
            <span class="text-gray-300">API Gateway</span>
            <div class="flex items-center gap-2">
              <StatusLED variant="green" />
              <span class="text-green-400 text-sm">Operational</span>
            </div>
          </div>
        </div>
      </div>
    `,
  }),
}

export const Red: Story = {
  render: () => ({
    components: { StatusLED },
    template: `
      <div class="bg-black p-8">
        <StatusLED variant="red" />
      </div>
    `,
  }),
}

export const Yellow: Story = {
  render: () => ({
    components: { StatusLED },
    template: `
      <div class="bg-black p-8">
        <StatusLED variant="yellow" />
      </div>
    `,
  }),
}

export const Green: Story = {
  render: () => ({
    components: { StatusLED },
    template: `
      <div class="bg-black p-8">
        <StatusLED variant="green" />
      </div>
    `,
  }),
}
