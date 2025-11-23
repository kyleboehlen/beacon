import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import SideDrawer from './SideDrawer.vue'

const meta: Meta<typeof SideDrawer> = {
  title: 'Shared/SideDrawer',
  component: SideDrawer,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof SideDrawer>

export const Default: Story = {
  render: () => ({
    components: { SideDrawer },
    setup() {
      const drawer = ref<InstanceType<typeof SideDrawer>>()
      return { drawer }
    },
    template: `
      <div>
        <button
          @click="drawer.open()"
          class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Open Drawer
        </button>

        <SideDrawer ref="drawer">
          <template #header>
            <h3 class="text-lg font-bold">Drawer Title</h3>
          </template>

          <div>
            <p>Drawer content goes here.</p>
          </div>
        </SideDrawer>
      </div>
    `,
  }),
}

export const CommandCenterExample: Story = {
  render: () => ({
    components: { SideDrawer },
    setup() {
      const drawer = ref<InstanceType<typeof SideDrawer>>()
      return { drawer }
    },
    template: `
      <div>
        <button
          @click="drawer.open()"
          class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Open Command Center
        </button>

        <SideDrawer ref="drawer">
          <template #header>
            <h3 class="text-lg font-bold text-gray-800 dark:text-white">Beacon Command</h3>
          </template>

          <div class="space-y-6">
            <!-- Commander Section -->
            <div>
              <h4 class="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">Commander</h4>
              <div class="flex items-center gap-3 p-3 bg-gray-50 dark:bg-neutral-700 rounded">
                <div class="w-10 h-10 bg-red-500 rounded-full"></div>
                <div class="flex-1">
                  <p class="font-medium text-gray-800 dark:text-white">Red Squadron</p>
                  <button class="text-sm text-blue-600 hover:underline">Change Color →</button>
                </div>
              </div>
            </div>

            <!-- Quick Actions -->
            <div>
              <h4 class="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">Quick Actions</h4>
              <div class="space-y-2">
                <button class="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-neutral-700 rounded">New Game</button>
                <button class="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-neutral-700 rounded">Save Game</button>
                <button class="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-neutral-700 rounded">Load Game</button>
              </div>
            </div>

            <!-- Quick Reference -->
            <div>
              <h4 class="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">Quick Reference</h4>
              <div class="space-y-2">
                <button class="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-neutral-700 rounded">Ship Costs</button>
                <button class="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-neutral-700 rounded">Tech Tree</button>
              </div>
            </div>

            <!-- Settings -->
            <div class="pt-4 border-t border-gray-200 dark:border-neutral-700">
              <div class="space-y-2">
                <button class="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-neutral-700 rounded">⚙️ Settings</button>
                <button class="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-neutral-700 rounded">❓ Help</button>
              </div>
            </div>
          </div>
        </SideDrawer>
      </div>
    `,
  }),
}
