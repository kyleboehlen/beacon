import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import TabsNav from './TabsNav.vue'

const meta: Meta<typeof TabsNav> = {
  title: 'Shared/TabsNav',
  component: TabsNav,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof TabsNav>

export const Default: Story = {
  render: () => ({
    components: { Tabs: TabsNav },
    setup() {
      const activeTab = ref('fleet')
      const tabs = [
        { key: 'fleet', label: 'Fleet Status' },
        { key: 'resources', label: 'Resources' },
        { key: 'missions', label: 'Missions' },
      ]
      return { activeTab, tabs }
    },
    template: `
      <div class="w-full h-100 bg-black p-8">
        <div class="max-w-4xl">
          <Tabs v-model="activeTab" :tabs="tabs" />

          <div class="mt-6">
            <div v-if="activeTab === 'fleet'" class="text-gray-300">
              <h3 class="text-xl font-bold text-white mb-4">Fleet Status</h3>
              <div class="space-y-2">
                <div class="flex justify-between">
                  <span>Active Ships:</span>
                  <span class="text-white font-semibold">24</span>
                </div>
                <div class="flex justify-between">
                  <span>In Dock:</span>
                  <span class="text-white font-semibold">8</span>
                </div>
                <div class="flex justify-between">
                  <span>On Mission:</span>
                  <span class="text-white font-semibold">16</span>
                </div>
              </div>
            </div>

            <div v-if="activeTab === 'resources'" class="text-gray-300">
              <h3 class="text-xl font-bold text-white mb-4">Resources</h3>
              <div class="space-y-2">
                <div class="flex justify-between">
                  <span>Credits:</span>
                  <span class="text-green-400 font-semibold">12,450</span>
                </div>
                <div class="flex justify-between">
                  <span>Fuel:</span>
                  <span class="text-blue-400 font-semibold">8,200 units</span>
                </div>
                <div class="flex justify-between">
                  <span>Materials:</span>
                  <span class="text-purple-400 font-semibold">3,100 tons</span>
                </div>
              </div>
            </div>

            <div v-if="activeTab === 'missions'" class="text-gray-300">
              <h3 class="text-xl font-bold text-white mb-4">Active Missions</h3>
              <div class="space-y-3">
                <div class="border border-white/10 rounded p-3">
                  <div class="font-semibold text-white">Patrol Sector 7</div>
                  <div class="text-sm text-gray-400">ETA: 2 hours</div>
                </div>
                <div class="border border-white/10 rounded p-3">
                  <div class="font-semibold text-white">Escort Convoy</div>
                  <div class="text-sm text-gray-400">ETA: 5 hours</div>
                </div>
                <div class="border border-white/10 rounded p-3">
                  <div class="font-semibold text-white">Resource Gathering</div>
                  <div class="text-sm text-gray-400">ETA: 12 hours</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `,
  }),
}

export const StyledTabs: Story = {
  render: () => ({
    components: { TabsNav },
    setup() {
      const activeTab = ref('blue')
      const tabs = [
        {
          key: 'blue',
          label: 'Blue Tab',
          activeStyles: '!bg-blue-500/20 !border-b-blue-500',
          inactiveStyles: 'bg-blue-500/5 text-blue-300/50 hover:bg-blue-500/10 hover:text-blue-300',
        },
        {
          key: 'red',
          label: 'Red Tab',
          activeStyles: '!bg-red-500/20 !border-b-red-500',
          inactiveStyles: 'bg-red-500/5 text-red-300/50 hover:bg-red-500/10 hover:text-red-300',
        },
        {
          key: 'green',
          label: 'Green Tab',
          activeStyles: '!bg-green-500/20 !border-b-green-500',
          inactiveStyles: 'bg-green-500/5 text-green-300/50 hover:bg-green-500/10 hover:text-green-300',
        },
      ]
      return { activeTab, tabs }
    },
    template: `
      <div class="w-full h-50 bg-black p-8">
        <div class="max-w-4xl">
          <TabsNav v-model="activeTab" :tabs="tabs" />
        </div>
      </div>
    `,
  }),
}
