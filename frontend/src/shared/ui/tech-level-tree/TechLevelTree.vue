<script setup lang="ts">
import { computed, onMounted, useId } from 'vue'
import { Icon } from '@iconify/vue'
import type { LevelNode, NodeState } from './types'
import { techColorPalette } from './palette'

const props = withDefaults(defineProps<{
  name: string
  description?: string
  nodes: LevelNode[]
  interactive: boolean
  colorIndex?: number
}>(), {
  description: undefined,
  colorIndex: 0,
})

const emit = defineEmits<{
  nodeClicked: [index: number]
}>()

const uid = useId()
const descriptionTooltipId = `${uid}-description`
const tooltipId = (index: number) => `${uid}-tooltip-${index}`

const color = computed(() => techColorPalette[props.colorIndex % techColorPalette.length])

const nodeClasses = (state: NodeState) => {
  switch (state) {
    case 'purchased':   return `text-white ${color.value.purchased}`
    case 'staged':      return `text-white ${color.value.staged}`
    case 'purchasable': return `text-white bg-transparent ${color.value.purchasable}`
    case 'disabled':    return 'text-white/20 bg-white/5 border-white/10'
  }
}

const connectorClasses = (precedingState: NodeState, currentState: NodeState) => {
  if (precedingState === 'purchased' && currentState === 'purchased') return color.value.afterPurchased
  return 'bg-white/15'
}

const isClickable = (state: NodeState) =>
  props.interactive && (state === 'purchasable' || state === 'staged')

const handleNodeClick = (index: number, state: NodeState) => {
  if (!isClickable(state)) return
  emit('nodeClicked', index)
}

const hasTooltip = (node: LevelNode) => node.description !== undefined || node.cost !== undefined

onMounted(() => {
  if (typeof window !== 'undefined' && window.HSStaticMethods) {
    window.HSStaticMethods.autoInit(['tooltip'])
  }
})
</script>

<template>
  <div class="flex items-center gap-3 w-full select-none">
    <div class="flex items-center gap-1 w-36 shrink-0 min-w-0">
      <span class="text-sm text-white/70 truncate">{{ name }}</span>

      <div v-if="description" class="hs-tooltip inline-block shrink-0">
        <button
          type="button"
          class="hs-tooltip-toggle flex items-center justify-center text-white/30 hover:text-white/60 transition-colors cursor-default focus:outline-none focus-visible:text-white/60"
          :aria-label="`${name} rule description`"
          :aria-describedby="descriptionTooltipId"
        >
          <Icon icon="material-symbols:info-outline" class="size-3.5" aria-hidden="true" />
        </button>
        <div
          :id="descriptionTooltipId"
          class="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity absolute invisible z-50 rounded-lg shadow-xl bg-neutral-900 border border-white/10 px-3 py-2 max-w-56 text-xs text-white/80"
          role="tooltip"
        >
          {{ description }}
        </div>
      </div>
    </div>

    <div class="flex items-center flex-1">
      <template v-for="(node, index) in nodes" :key="index">
        <div
          v-if="index > 0"
          class="flex-1 h-0.5 min-w-2"
          :class="connectorClasses(nodes[index - 1].state, node.state)"
        />

        <div class="hs-tooltip inline-block shrink-0">
          <button
            v-if="isClickable(node.state)"
            type="button"
            class="hs-tooltip-toggle size-6 rounded-full border-2 transition-all duration-150 flex items-center justify-center text-xs font-medium leading-none cursor-pointer hover:brightness-125 pt-0.5"
            :class="nodeClasses(node.state)"
            :aria-label="`${node.state === 'staged' ? 'Remove staged upgrade' : 'Stage upgrade'}${node.cost !== undefined ? ` (${node.cost} CP)` : ''}`"
            :aria-pressed="node.state === 'staged'"
            :aria-describedby="hasTooltip(node) ? tooltipId(index) : undefined"
            @click="handleNodeClick(index, node.state)"
          >{{ index + 1 }}</button>

          <span
            v-else
            class="hs-tooltip-toggle size-6 rounded-full border-2 flex items-center justify-center text-xs font-medium leading-none pt-0.5 cursor-default"
            :class="nodeClasses(node.state)"
            :tabindex="hasTooltip(node) ? 0 : undefined"
            :aria-describedby="hasTooltip(node) ? tooltipId(index) : undefined"
          >{{ index + 1 }}</span>

          <div
            v-if="hasTooltip(node)"
            :id="tooltipId(index)"
            class="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity absolute invisible z-50 rounded-lg shadow-xl bg-neutral-900 border border-white/10 px-3 py-2 min-w-28"
            role="tooltip"
          >
            <p v-if="node.description" class="text-white text-xs font-medium">{{ node.description }}</p>
            <p v-if="node.cost !== undefined" class="text-white/50 text-xs" :class="node.description ? 'mt-1' : ''">{{ node.cost }} CP</p>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped></style>