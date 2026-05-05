import type { Meta, StoryObj } from '@storybook/vue3-vite'
import RuleReferenceLink from './RuleReferenceLink.vue'

const meta: Meta<typeof RuleReferenceLink> = {
  title: 'Shared/RuleReferenceLink',
  component: RuleReferenceLink,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof RuleReferenceLink>

export const Default: Story = {
  render: () => ({
    components: { RuleReferenceLink },
    template: `
      <div class="bg-black p-8">
        <p class="text-white">
          MS Pipelines <RuleReferenceLink reference-number="13.0" :page="15" />
        </p>
      </div>
    `,
  }),
}
