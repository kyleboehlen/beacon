import type { Meta, StoryObj } from '@storybook/vue3-vite'
import ContainerChrome from './ContainerChrome.vue'

const meta: Meta<typeof ContainerChrome> = {
  title: 'Shared/ContainerChrome',
  component: ContainerChrome,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof ContainerChrome>

export const Default: Story = {
  render: () => ({
    components: { ContainerChrome },
    template: `
      <div class="w-full h-screen bg-black relative flex flex-row justify-center items-center">
        <div class="w-1/2 h-1/2 m-16 bg-blue-950 relative">
          <ContainerChrome>
            <div class="w-full h-full flex items-center justify-center">
              <h1 class="text-4xl font-bold text-white">Content</h1>
            </div>
          </ContainerChrome>
        </div>
      </div>
    `,
  }),
}

export const WithSideDecorations: Story = {
  render: () => ({
    components: { ContainerChrome },
    template: `
      <div class="w-full h-screen bg-black relative flex flex-row justify-center items-center">
        <div class="w-1/2 h-1/2 m-16 bg-red-950 relative">
          <ContainerChrome :showSideDecorations="true">
            <div class="w-full h-full flex items-center justify-center">
              <h1 class="text-4xl font-bold text-white">Content</h1>
            </div>
          </ContainerChrome>
        </div>
      </div>
    `,
  }),
}
