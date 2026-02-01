import type { Meta, StoryObj } from '@storybook/vue3-vite'
import SystemStatus from './SystemStatus.vue'

const meta: Meta<typeof SystemStatus> = {
  title: 'Shared/SystemStatus',
  component: SystemStatus,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof SystemStatus>

const quickSuccess = (): Promise<boolean> => {
  return new Promise((resolve) => setTimeout(() => resolve(true), 3000))
}

const quickFailure = (): Promise<boolean> => {
  return new Promise((resolve) => setTimeout(() => resolve(false), 2000))
}

const longLoading = (): Promise<boolean> => {
  return new Promise((resolve) => setTimeout(() => resolve(true), 5000))
}

export const Default: Story = {
  render: () => ({
    components: { SystemStatus },
    setup() {
      return { quickSuccess }
    },
    template: `
      <div class="bg-black p-8">
        <SystemStatus :fn="quickSuccess" v-slot="{ dots, status }">
          System Status{{ dots }} {{ status === 'success' ? ' online' : '' }}
        </SystemStatus>
      </div>
    `,
  }),
}

export const FailedState: Story = {
  render: () => ({
    components: { SystemStatus },
    setup() {
      return { quickFailure }
    },
    template: `
      <div class="bg-black p-8">
        <SystemStatus :fn="quickFailure" v-slot="{ dots, status }">
          Scenario Loader{{ dots }}{{ status === 'failed' ? ' failed to load' : '' }}
        </SystemStatus>
      </div>
    `,
  }),
}

export const LongLoading: Story = {
  render: () => ({
    components: { SystemStatus },
    setup() {
      return { longLoading }
    },
    template: `
      <div class="bg-black p-8">
        <SystemStatus :fn="longLoading" v-slot="{ dots, status }">
          Database Connection{{ dots }}{{ status === 'success' ? ' established' : '' }}
        </SystemStatus>
      </div>
    `,
  }),
}

export const MultipleStatuses: Story = {
  render: () => ({
    components: { SystemStatus },
    setup() {
      const beaconCheck = (): Promise<boolean> => {
        return new Promise((resolve) => setTimeout(() => resolve(true), 2500))
      }
      const loadingCheck = (): Promise<boolean> => {
        return new Promise((resolve) => setTimeout(() => resolve(false), 4000))
      }
      return { beaconCheck, loadingCheck }
    },
    template: `
      <div class="bg-black p-8">
        <div class="flex flex-col gap-2 text-left">
          <SystemStatus :fn="beaconCheck" v-slot="{ dots, status }">
            B.E.A.C.O.N. status{{ dots }}{{ status === 'success' ? ' online' : '' }}
          </SystemStatus>
          <SystemStatus :fn="loadingCheck" v-slot="{ dots, status }">
            Loading{{ dots }}{{ status === 'failed' ? ' no scenario found' : '' }}
          </SystemStatus>
        </div>
      </div>
    `,
  }),
}
