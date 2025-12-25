import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import SystemStatus from './SystemStatus.vue'

const meta: Meta<typeof SystemStatus> = {
  title: 'Shared/SystemStatus',
  component: SystemStatus,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof SystemStatus>

export const Default: Story = {
  render: () => ({
    components: { SystemStatus },
    template: `
      <div class="bg-black p-8">
        <SystemStatus />
      </div>
    `,
  }),
}

export const ManualStart: Story = {
  render: () => ({
    components: { SystemStatus },
    setup() {
      const statusRef = ref(null)
      return { statusRef }
    },
    template: `
      <div class="bg-black p-8 space-y-4">
        <SystemStatus :auto-start="false" ref="statusRef" />
        <button
          @click="statusRef.startSequence()"
          class="px-4 py-2 bg-white/10 text-white rounded hover:bg-white/20"
        >
          Start Sequence
        </button>
      </div>
    `,
  }),
}

export const InitializingState: Story = {
  render: () => ({
    components: { SystemStatus },
    template: `
      <div class="bg-black p-8">
        <SystemStatus :auto-start="false" />
      </div>
    `,
  }),
}

export const CustomText: Story = {
  render: () => ({
    components: { SystemStatus },
    template: `
      <div class="bg-black p-8 space-y-6">
        <SystemStatus>
          <template #initializing>Loading system modules</template>
          <template #online>All systems operational</template>
        </SystemStatus>

        <SystemStatus>
          <template #initializing>Connecting to server</template>
          <template #online>
            <span class="font-bold">CONNECTED</span> - Ready for input
          </template>
        </SystemStatus>
      </div>
    `,
  }),
}
