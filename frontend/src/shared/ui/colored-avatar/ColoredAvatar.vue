<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { computed, type PropType, ref } from 'vue'
import {
  getPlayerColorBorder,
  getPlayerColorText,
  getAccessibilityColor,
  PLAYER_COLORS,
  type PlayerColor,
} from '@/shared/lib/constants'

const props = defineProps({
  initialColor: {
    type: String as PropType<PlayerColor>,
    default: 'white' as PlayerColor,
    validator: (value: string) => PLAYER_COLORS.includes(value as PlayerColor),
  },
  allowColorChange: {
    type: Boolean,
    default: true,
  },
})

const color = ref(props.initialColor)

const borderColor = computed(() => getPlayerColorBorder(color.value))
const avatarColor = computed(() => getPlayerColorText(color.value))

const buttonBaseClasses =
  'w-10 h-10 rounded-full transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white'

const changeColor = (newColor: PlayerColor) => {
  color.value = newColor
}

const handleKeyboardActivation = (event: KeyboardEvent) => {
  if (props.allowColorChange && event.currentTarget instanceof HTMLElement) {
    event.currentTarget.click()
  }
}
</script>

<template>
  <div
    :class="[
      'inline-block rounded-full border-4 bg-transparent p-2',
      {
        'hs-tooltip [--trigger:click] sm:[--placement:right] hover:cursor-pointer': props.allowColorChange,
        [borderColor]: true,
      },
    ]"
  >
    <div
      :class="[
        'flex items-center justify-center w-full h-full bg-transparent',
        { 'hs-tooltip-toggle': props.allowColorChange },
      ]"
      :tabindex="props.allowColorChange ? 0 : undefined"
      :role="props.allowColorChange ? 'button' : undefined"
      :aria-label="
        props.allowColorChange
          ? `Change color. Current color: ${getAccessibilityColor(color)}`
          : undefined
      "
      :aria-haspopup="props.allowColorChange ? 'dialog' : undefined"
      @keydown.enter="handleKeyboardActivation"
      @keydown.space.prevent="handleKeyboardActivation"
    >
      <Icon
        icon="si:rocket-duotone"
        class="w-full h-full"
        :class="avatarColor"
        aria-hidden="true"
      />
    </div>

    <div
      v-if="props.allowColorChange"
      class="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity absolute z-10 max-w-xs bg-white border border-gray-100 text-start rounded-xl shadow-md after:absolute after:top-0 after:-start-4 after:w-4 after:h-full dark:bg-neutral-800 dark:border-neutral-700"
      role="dialog"
      aria-label="Color picker"
    >
      <div class="p-4">
        <div class="flex gap-3" role="group" aria-label="Available colors">
          <button
            v-for="colorOption in PLAYER_COLORS.filter((c) => c !== 'white')"
            :key="colorOption"
            @click="changeColor(colorOption)"
            :class="[buttonBaseClasses, `bg-${colorOption}`]"
            :aria-label="`Select ${getAccessibilityColor(colorOption)} color`"
            :aria-pressed="color === colorOption"
          >
            <span v-if="color === colorOption" class="sr-only">(current)</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
