import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref, computed } from 'vue'
import TechLevelTree from './TechLevelTree.vue'
import type { LevelNode } from './types'

const meta: Meta<typeof TechLevelTree> = {
  title: 'Shared/TechLevelTree',
  component: TechLevelTree,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof TechLevelTree>

export const Default: Story = {
  render: () => ({
    components: { TechLevelTree },
    setup() {
      const techs: { name: string; description: string; colorIndex: number; nodes: LevelNode[] }[] = [
        {
          name: 'Ship Size', colorIndex: 0,
          description: 'Starting level 1 allows building Scouts (SC), Colony Ships (CO), Shipyards (SY), Mining Ships, Decoys, and MS Pipelines. Higher levels unlock progressively larger hull classes.',
          nodes: [
            { state: 'purchased' },
            { state: 'purchased', cost: 10,  description: 'Unlocks Destroyer (DD) and Base.' },
            { state: 'disabled',  cost: 15,  description: 'Unlocks Cruiser (CA).' },
            { state: 'disabled',  cost: 20,  description: 'Unlocks Battlecruiser (BC).' },
            { state: 'disabled',  cost: 20,  description: 'Unlocks Battleship (BB).' },
            { state: 'disabled',  cost: 20,  description: 'Unlocks Dreadnought (DN).' },
            { state: 'disabled',  cost: 30,  description: 'Unlocks Titan (TN).' },
          ],
        },
        {
          name: 'Attack', colorIndex: 1,
          description: 'Increases ship attack ratings in battle. Cannot exceed the ship\'s Hull Size (9.2). Level 4 is restricted to Starbases and Titans only.',
          nodes: [
            { state: 'purchased', cost: 20, description: 'Add 1 to this ship\'s attack rating when in battle.' },
            { state: 'disabled',  cost: 30, description: 'Add 2 to this ship\'s attack rating when in battle (cannot exceed Hull Size).' },
            { state: 'disabled',  cost: 25, description: 'Add 3 to this ship\'s attack rating when in battle (cannot exceed Hull Size).' },
            { state: 'disabled',  cost: 10, description: 'Add 4 to attack rating for Starbases and Titans only.' },
          ],
        },
        {
          name: 'Defense', colorIndex: 2,
          description: 'Increases ship defense ratings in battle. Cannot exceed the ship\'s Hull Size (9.2).',
          nodes: [
            { state: 'disabled', cost: 20, description: 'Add 1 to this ship\'s defense rating when in battle.' },
            { state: 'disabled', cost: 30, description: 'Add 2 to this ship\'s defense rating when in battle (cannot exceed Hull Size).' },
            { state: 'disabled', cost: 25, description: 'Add 3 to this ship\'s defense rating when in battle (cannot exceed Hull Size).' },
          ],
        },
        {
          name: 'Tactics', colorIndex: 3,
          description: 'When opposing ships share the same Weapon Class, the side with the higher Tactics rating fires first. If Tactics ratings also tie, the defender fires first.',
          nodes: [
            { state: 'purchased', cost: 15, description: 'Fire before ships with Tactics 0 in the same weapon class.' },
            { state: 'disabled',  cost: 15, description: 'Fire before ships with Tactics 1 in the same weapon class.' },
            { state: 'disabled',  cost: 15, description: 'Fire before ships with Tactics 2 in the same weapon class.' },
          ],
        },
        {
          name: 'Move', colorIndex: 4,
          description: 'Determines how many hexes ships can move each turn in a 3-turn cycle before the economic phase.',
          nodes: [
            { state: 'purchased' },
            { state: 'purchased', cost: 20, description: 'Movement: 1 / 1 / 2 (turns 1, 2, 3).' },
            { state: 'disabled',  cost: 25, description: 'Movement: 1 / 2 / 2.' },
            { state: 'disabled',  cost: 25, description: 'Movement: 2 / 2 / 2.' },
            { state: 'disabled',  cost: 25, description: 'Movement: 2 / 2 / 3.' },
            { state: 'disabled',  cost: 20, description: 'Movement: 2 / 3 / 3.' },
            { state: 'disabled',  cost: 20, description: 'Movement: 3 / 3 / 3.' },
          ],
        },
        {
          name: 'Shipyards', colorIndex: 5,
          description: 'Determines hull points buildable per Shipyard per econ phase. Level 1: each Shipyard produces 1 hull point. Two Shipyards in the same system combine their capacity.',
          nodes: [
            { state: 'purchased' },
            { state: 'disabled', cost: 20, description: 'Each Shipyard produces 1.5 hull points per econ phase (rounded down).' },
            { state: 'disabled', cost: 25, description: 'Each Shipyard produces 2 hull points per econ phase.' },
          ],
        },
        {
          name: 'Ground Combat', colorIndex: 6,
          description: 'Starting level 1 allows building Transports (T) and Infantry (INF) for ground combat and planetary bombardment.',
          nodes: [
            { state: 'purchased' },
            { state: 'disabled', cost: 10, description: 'Unlocks Space Marines and Heavy Infantry.' },
            { state: 'disabled', cost: 15, description: 'Unlocks Grav Armor. Transports equipped with drop ships — defense strength increases to 2.' },
          ],
        },
        {
          name: 'Supply Range', colorIndex: 7,
          description: 'Only used with Logistics Facilities (36.5). Supply Range is the max distance a non-Scout, non-Raider combat ship can be from a friendly Colony and still be in Supply.',
          nodes: [
            { state: 'purchased' },
            { state: 'disabled', cost: 10, description: 'Supply Range increases to 2 hexes from a friendly Colony.' },
            { state: 'disabled', cost: 15, description: 'Supply Range increases to 3 hexes from a friendly Colony.' },
            { state: 'disabled', cost: 15, description: 'Supply Range increases to 4 hexes from a friendly Colony.' },
          ],
        },
        {
          name: 'Cloaking', colorIndex: 8,
          description: 'Requires Cloaking rule. Level 0 provides no capability.',
          nodes: [
            { state: 'disabled', cost: 30, description: 'Unlocks Raiders (R).' },
            { state: 'disabled', cost: 30, description: 'Raiders increase in attack strength and become harder to detect.' },
          ],
        },
        {
          name: 'Advanced Construction', colorIndex: 9,
          description: 'Optional rule. Unlocks advanced ship variants and extended technologies. Level 0 provides no capability.',
          nodes: [
            { state: 'disabled', cost: 10, description: 'Unlocks Destroyer X (DDX), Advanced Bases, and new technologies for Battleship (BB), Dreadnought (DN), and Titan (TN).' },
            { state: 'disabled', cost: 10, description: 'Unlocks Battle Carriers (BV), Starbases, Fighter 4, and Mining Ship X.' },
            { state: 'disabled', cost: 10, description: 'Unlocks Raider X (RX), Scout X at Ship Size 7, and allows upgrading the Flagship.' },
          ],
        },
      ]
      return { techs }
    },
    template: `
      <div class="bg-black p-8 space-y-3 w-[720px]">
        <TechLevelTree
          v-for="tech in techs"
          :key="tech.colorIndex"
          :name="tech.name"
          :description="tech.description"
          :nodes="tech.nodes"
          :interactive="false"
          :color-index="tech.colorIndex"
        />
      </div>
    `,
  }),
}

export const Interactive: Story = {
  render: () => ({
    components: { TechLevelTree },
    setup() {
      const isStaged = ref(false)
      const nodes = computed<LevelNode[]>(() => [
        { state: 'purchased', cost: 20, description: 'Add 1 to this ship\'s attack rating when in battle.' },
        { state: isStaged.value ? 'staged' : 'purchasable', cost: 30, description: 'Add 2 to this ship\'s attack rating when in battle (cannot exceed Hull Size).' },
        { state: 'disabled', cost: 25, description: 'Add 3 to this ship\'s attack rating when in battle (cannot exceed Hull Size).' },
        { state: 'disabled', cost: 10, description: 'Add 4 to attack rating for Starbases and Titans only.' },
      ])
      const handleNodeClicked = (index: number) => {
        if (index === 1) isStaged.value = !isStaged.value
      }
      return { nodes, handleNodeClicked }
    },
    template: `
      <div class="bg-black p-8 w-[480px]">
        <TechLevelTree
          name="Attack"
          description="Increases ship attack ratings in battle. Cannot exceed the ship's Hull Size (9.2)."
          :nodes="nodes"
          :interactive="true"
          :color-index="1"
          @node-clicked="handleNodeClicked"
        />
        <p class="text-white/50 text-xs mt-4">Click the open node to stage/unstage the upgrade</p>
      </div>
    `,
  }),
}