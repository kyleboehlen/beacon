import type { Meta, StoryObj } from '@storybook/vue3-vite'
import BasicCard from './BasicCard.vue'
import { Icon } from '@iconify/vue'

const meta: Meta<typeof BasicCard> = {
  title: 'Shared/BasicCard',
  component: BasicCard,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof BasicCard>

export const Default: Story = {
  render: () => ({
    components: { BasicCard },
    template: `
      <div class="bg-black p-8">
        <BasicCard title="Default Card">
          <p class="text-gray-300">This is some default content inside the card.</p>
        </BasicCard>
      </div>
    `,
  }),
}

export const NoTitle: Story = {
  render: () => ({
    components: { BasicCard },
    template: `
      <div class="bg-black p-8">
        <BasicCard>
          <p class="text-gray-300">This card has no title, just content.</p>
          <p class="text-gray-400 mt-2">It can still contain multiple elements.</p>
        </BasicCard>
      </div>
    `,
  }),
}

export const CustomTitleSlot: Story = {
  render: () => ({
    components: { BasicCard, Icon },
    template: `
      <div class="bg-black p-8">
        <BasicCard>
          <template #title>
            <div class="flex items-center gap-2">
              <Icon icon="mdi:chart-line" class="text-blue-400 w-5 h-5" />
              <span>Custom Title with Icon</span>
            </div>
          </template>
          <p class="text-gray-300">Content with a custom title slot that includes an icon.</p>
        </BasicCard>
      </div>
    `,
  }),
}

export const WithStatistics: Story = {
  render: () => ({
    components: { BasicCard, Icon },
    template: `
      <div class="bg-black p-8">
        <BasicCard title="Statistics Overview">
          <div class="grid grid-cols-2 gap-4">
            <div class="bg-black/20 p-4 rounded border border-white/5">
              <div class="flex items-center gap-2 mb-2">
                <Icon icon="mdi:account-group" class="text-cyan-400 w-5 h-5" />
                <p class="text-xs text-gray-400 uppercase tracking-wide">Users</p>
              </div>
              <p class="text-2xl font-bold text-white">1,234</p>
            </div>
            <div class="bg-black/20 p-4 rounded border border-white/5">
              <div class="flex items-center gap-2 mb-2">
                <Icon icon="mdi:currency-usd" class="text-green-400 w-5 h-5" />
                <p class="text-xs text-gray-400 uppercase tracking-wide">Revenue</p>
              </div>
              <p class="text-2xl font-bold text-white">$56.7K</p>
            </div>
          </div>
        </BasicCard>
      </div>
    `,
  }),
}

export const WithTable: Story = {
  render: () => ({
    components: { BasicCard },
    template: `
      <div class="bg-black p-8">
        <BasicCard title="Recent Activity">
          <div class="overflow-x-auto">
            <table class="w-full text-sm text-left">
              <thead class="text-xs uppercase text-gray-400 border-b border-white/10">
                <tr>
                  <th scope="col" class="px-4 py-3">Name</th>
                  <th scope="col" class="px-4 py-3">Status</th>
                  <th scope="col" class="px-4 py-3">Date</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b border-white/5">
                  <td class="px-4 py-3 text-white">Item 1</td>
                  <td class="px-4 py-3 text-green-400">Active</td>
                  <td class="px-4 py-3 text-gray-400">2024-01-15</td>
                </tr>
                <tr class="border-b border-white/5">
                  <td class="px-4 py-3 text-white">Item 2</td>
                  <td class="px-4 py-3 text-yellow-400">Pending</td>
                  <td class="px-4 py-3 text-gray-400">2024-01-14</td>
                </tr>
                <tr>
                  <td class="px-4 py-3 text-white">Item 3</td>
                  <td class="px-4 py-3 text-blue-400">Completed</td>
                  <td class="px-4 py-3 text-gray-400">2024-01-13</td>
                </tr>
              </tbody>
            </table>
          </div>
        </BasicCard>
      </div>
    `,
  }),
}

export const WithList: Story = {
  render: () => ({
    components: { BasicCard, Icon },
    template: `
      <div class="bg-black p-8">
        <BasicCard title="Task List">
          <div class="space-y-2">
            <div class="flex items-center justify-between bg-black/20 p-3 rounded border border-white/5">
              <div class="flex items-center gap-2">
                <Icon icon="mdi:check-circle" class="text-green-400 w-4 h-4" />
                <span class="text-sm text-gray-300">Complete documentation</span>
              </div>
              <span class="text-xs text-gray-500">Done</span>
            </div>
            <div class="flex items-center justify-between bg-black/20 p-3 rounded border border-white/5">
              <div class="flex items-center gap-2">
                <Icon icon="mdi:clock-outline" class="text-yellow-400 w-4 h-4" />
                <span class="text-sm text-gray-300">Review pull requests</span>
              </div>
              <span class="text-xs text-gray-500">In Progress</span>
            </div>
            <div class="flex items-center justify-between bg-black/20 p-3 rounded border border-white/5">
              <div class="flex items-center gap-2">
                <Icon icon="mdi:circle-outline" class="text-gray-400 w-4 h-4" />
                <span class="text-sm text-gray-300">Deploy to production</span>
              </div>
              <span class="text-xs text-gray-500">Pending</span>
            </div>
          </div>
        </BasicCard>
      </div>
    `,
  }),
}

export const MultipleCards: Story = {
  render: () => ({
    components: { BasicCard },
    template: `
      <div class="bg-black p-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <BasicCard title="Card 1">
            <p class="text-gray-300">First card content</p>
          </BasicCard>
          <BasicCard title="Card 2">
            <p class="text-gray-300">Second card content</p>
          </BasicCard>
          <BasicCard title="Card 3">
            <p class="text-gray-300">Third card content</p>
          </BasicCard>
        </div>
      </div>
    `,
  }),
}

export const WithCustomClass: Story = {
  render: () => ({
    components: { BasicCard },
    template: `
      <div class="bg-black p-8">
        <BasicCard title="Full Height Card" class="h-96">
          <p class="text-gray-300">This card has a custom height class applied.</p>
        </BasicCard>
      </div>
    `,
  }),
}

export const MinimalContent: Story = {
  render: () => ({
    components: { BasicCard },
    template: `
      <div class="bg-black p-8">
        <BasicCard title="Minimal">
          <p class="text-gray-300">Just a single line.</p>
        </BasicCard>
      </div>
    `,
  }),
}

export const RichContent: Story = {
  render: () => ({
    components: { BasicCard, Icon },
    template: `
      <div class="bg-black p-8 max-w-2xl">
        <BasicCard title="System Status">
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <span class="text-gray-300">CPU Usage</span>
              <span class="text-green-400 font-semibold">45%</span>
            </div>
            <div class="w-full bg-gray-700 rounded-full h-2">
              <div class="bg-green-500 h-2 rounded-full" style="width: 45%"></div>
            </div>

            <div class="flex items-center justify-between">
              <span class="text-gray-300">Memory</span>
              <span class="text-yellow-400 font-semibold">72%</span>
            </div>
            <div class="w-full bg-gray-700 rounded-full h-2">
              <div class="bg-yellow-500 h-2 rounded-full" style="width: 72%"></div>
            </div>

            <div class="flex items-center justify-between">
              <span class="text-gray-300">Disk Space</span>
              <span class="text-red-400 font-semibold">89%</span>
            </div>
            <div class="w-full bg-gray-700 rounded-full h-2">
              <div class="bg-red-500 h-2 rounded-full" style="width: 89%"></div>
            </div>
          </div>
        </BasicCard>
      </div>
    `,
  }),
}
