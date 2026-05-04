import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import { createPinia, setActivePinia } from 'pinia'
import ToastItem from './ToastItem.vue'
import ToastContainer from './ToastContainer.vue'
import { useToast } from '@/shared/lib/composables/useToast'
import type { ToastType } from './types'

const pinia = createPinia()

const meta: Meta<typeof ToastItem> = {
  title: 'Shared/Toast',
  component: ToastItem,
  tags: ['autodocs'],
  decorators: [
    () => {
      setActivePinia(pinia)
      return {
        template: '<story />',
      }
    },
  ],
}

export default meta

type Story = StoryObj<typeof ToastItem>

export const AllTypes: Story = {
  render: () => ({
    components: { ToastItem },
    setup() {
      const toasts = [
        { type: 'success' as const, message: 'Operation completed successfully!' },
        { type: 'error' as const, message: 'An error occurred. Please try again.' },
        { type: 'warning' as const, message: 'Please review your changes before proceeding.' },
        { type: 'info' as const, message: 'Your session will expire in 5 minutes.' },
      ]
      return { toasts }
    },
    template: `
      <div class="bg-black p-8 min-h-[400px]">
        <div class="flex flex-col gap-3 max-w-sm">
          <ToastItem
            v-for="(toast, index) in toasts"
            :key="index"
            :message="toast.message"
            :type="toast.type"
            :dismissible="true"
            @dismiss="() => {}"
          />
        </div>
      </div>
    `,
  }),
}

export const Success: Story = {
  render: () => ({
    components: { ToastItem },
    template: `
      <div class="bg-black p-8">
        <div class="max-w-sm">
          <ToastItem
            message="Your changes have been saved successfully!"
            type="success"
            :dismissible="true"
            @dismiss="() => {}"
          />
        </div>
      </div>
    `,
  }),
}

export const ErrorToast: Story = {
  render: () => ({
    components: { ToastItem },
    template: `
      <div class="bg-black p-8">
        <div class="max-w-sm">
          <ToastItem
            message="Failed to save changes. Please try again."
            type="error"
            :dismissible="true"
            @dismiss="() => {}"
          />
        </div>
      </div>
    `,
  }),
}

export const Warning: Story = {
  render: () => ({
    components: { ToastItem },
    template: `
      <div class="bg-black p-8">
        <div class="max-w-sm">
          <ToastItem
            message="Your session will expire soon. Please save your work."
            type="warning"
            :dismissible="true"
            @dismiss="() => {}"
          />
        </div>
      </div>
    `,
  }),
}

export const Info: Story = {
  render: () => ({
    components: { ToastItem },
    template: `
      <div class="bg-black p-8">
        <div class="max-w-sm">
          <ToastItem
            message="New features are available. Check out the changelog."
            type="info"
            :dismissible="true"
            @dismiss="() => {}"
          />
        </div>
      </div>
    `,
  }),
}

export const NonDismissible: Story = {
  render: () => ({
    components: { ToastItem },
    template: `
      <div class="bg-black p-8">
        <div class="max-w-sm">
          <ToastItem
            message="This toast cannot be dismissed manually."
            type="info"
            :dismissible="false"
            @dismiss="() => {}"
          />
        </div>
      </div>
    `,
  }),
}

export const LongMessage: Story = {
  render: () => ({
    components: { ToastItem },
    template: `
      <div class="bg-black p-8">
        <div class="max-w-sm">
          <ToastItem
            message="This is a very long message that demonstrates how the toast component handles text wrapping and maintains proper layout even with extended content. The toast should expand vertically to accommodate the text."
            type="warning"
            :dismissible="true"
            @dismiss="() => {}"
          />
        </div>
      </div>
    `,
  }),
}

export const WithCustomContent: Story = {
  render: () => ({
    components: { ToastItem },
    template: `
      <div class="bg-black p-8">
        <div class="max-w-sm">
          <ToastItem
            type="success"
            :dismissible="true"
            @dismiss="() => {}"
          >
            <div class="space-y-2">
              <p class="text-white font-semibold">File uploaded!</p>
              <p class="text-white/70 text-xs">document.pdf (2.4 MB)</p>
              <button class="text-blue-400 text-sm hover:underline">View file</button>
            </div>
          </ToastItem>
        </div>
      </div>
    `,
  }),
}

export const Interactive: Story = {
  render: () => ({
    components: { ToastContainer },
    setup() {
      const store = useToast()
      const addToast = (type: ToastType) => {
        const messages = {
          success: 'Operation completed successfully!',
          error: 'An error occurred. Please try again.',
          warning: 'Please review your changes.',
          info: 'Here is some information.',
        }
        store.add({ message: messages[type], type, duration: 5000 })
      }
      return { addToast, store }
    },
    template: `
      <div class="bg-black p-8 min-h-[400px]">
        <div class="space-y-4">
          <h3 class="text-white text-lg font-bold">Interactive Demo</h3>
          <p class="text-white/70 text-sm">Click buttons to add toasts. They auto-dismiss after 5 seconds.</p>
          <div class="flex flex-wrap gap-2">
            <button
              class="px-4 py-2 bg-green-500/20 border border-green-500/50 text-green-400 rounded hover:bg-green-500/30"
              @click="addToast('success')"
            >
              Success
            </button>
            <button
              class="px-4 py-2 bg-red-500/20 border border-red-500/50 text-red-400 rounded hover:bg-red-500/30"
              @click="addToast('error')"
            >
              Error
            </button>
            <button
              class="px-4 py-2 bg-yellow-500/20 border border-yellow-500/50 text-yellow-400 rounded hover:bg-yellow-500/30"
              @click="addToast('warning')"
            >
              Warning
            </button>
            <button
              class="px-4 py-2 bg-white/10 border border-white/30 text-white/80 rounded hover:bg-white/20"
              @click="addToast('info')"
            >
              Info
            </button>
            <button
              class="px-4 py-2 bg-white/5 border border-white/20 text-white/60 rounded hover:bg-white/10"
              @click="store.clear()"
            >
              Clear All
            </button>
          </div>
        </div>
        <ToastContainer />
      </div>
    `,
  }),
}

export const Stacked: Story = {
  render: () => ({
    components: { ToastItem },
    setup() {
      const toasts = ref([
        { id: '1', message: 'First notification', type: 'success' as const },
        { id: '2', message: 'Second notification', type: 'info' as const },
        { id: '3', message: 'Third notification', type: 'warning' as const },
        { id: '4', message: 'Fourth notification', type: 'error' as const },
      ])
      const remove = (id: string) => {
        toasts.value = toasts.value.filter((t) => t.id !== id)
      }
      return { toasts, remove }
    },
    template: `
      <div class="bg-black p-8 min-h-[500px]">
        <div class="fixed top-4 right-4 flex flex-col gap-3 max-w-sm">
          <ToastItem
            v-for="toast in toasts"
            :key="toast.id"
            :message="toast.message"
            :type="toast.type"
            :dismissible="true"
            @dismiss="remove(toast.id)"
          />
        </div>
      </div>
    `,
  }),
}