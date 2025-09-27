import type { Meta, StoryObj } from '@storybook/vue3-vite'
import BeaconMainTitle from './BeaconMainTitle.vue'
import { StarryBackground } from '@/widgets/starry-background'

const meta: Meta<typeof BeaconMainTitle> = {
  title: 'Shared/BeaconMainTitle',
  component: BeaconMainTitle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    default: {
      name: "Title Text",
      description: "The text content of the main title",
      type: "string"
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    default: 'B.E.A.C.O.N'
  },
  render: (args) => ({
    components: { BeaconMainTitle },
    setup() {
      return { args }
    },
    template: '<BeaconMainTitle class="text-5xl">{{ args.default }}</BeaconMainTitle>',
  }),
}

export const OnStarryBackground: Story = {
  args: {
    default: 'B.E.A.C.O.N'
  },
  render: (args) => ({
    components: { BeaconMainTitle, StarryBackground },
    setup() {
      return { args }
    },
    template: `<StarryBackground class="w-225 h-100 text-stone-200 flex flex-col justify-center items-center">
                  <BeaconMainTitle v-bind="args" class="text-5xl">{{ args.default }}</BeaconMainTitle>
              </StarryBackground>`
  }),
}
