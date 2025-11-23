import type { Meta, StoryObj } from '@storybook/vue3-vite'
import ColoredAvatar from './ColoredAvatar.vue'

const meta: Meta<typeof ColoredAvatar> = {
  title: 'Shared/ColoredAvatar',
  component: ColoredAvatar,
  tags: ['autodocs'],
  render: (args) => ({
    components: { ColoredAvatar },
    setup() {
      return { args }
    },
    template:
      '<div class="w-full h-50 bg-black flex items-center pl-8"><ColoredAvatar v-bind="args" /></div>',
  }),
  argTypes: {
    initialColor: {
      control: 'text',
      description: 'Tailwind text color class for the avatar',
    },
    allowColorChange: {
      control: 'boolean',
      description: 'Whether or not to show the color change popover',
    },
  },
}

export default meta
type Story = StoryObj<typeof ColoredAvatar>

export const Default: Story = {
  args: {
    initialColor: 'white',
    allowColorChange: true,
    class: 'w-25 h-25',
  }
}

export const DisableChangingColor: Story = {
  args: {
    initialColor: 'blue-700',
    allowColorChange: false,
    class: 'w-25 h-25',
  }
}
