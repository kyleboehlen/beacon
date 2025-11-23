<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { computed, type PropType, ref } from 'vue'
import {
  getPlayerColorBorder,
  getPlayerColorText,
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

const buttonBaseClasses = 'w-10 h-10 rounded-full transition-all hover:scale-110'

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
        'hs-tooltip [--trigger:click] sm:[--placement:right]': props.allowColorChange,
        [borderColor]: true,
        'hover:cursor-pointer': props.allowColorChange,
      },
    ]"
  >
    <div
      :class="[
        'flex items-center justify-center w-full h-full bg-transparent',
        { 'hs-tooltip-toggle': props.allowColorChange },
      ]"
      :tabindex="props.allowColorChange ? 0 : undefined"
      @keydown.enter="handleKeyboardActivation"
      @keydown.space.prevent="handleKeyboardActivation"
    >
      <Icon
        icon="si:rocket-duotone"
        class="w-full h-full"
        :class="avatarColor"
        data-test-id="avatar-icon"
      />
    </div>

    <div
      v-if="props.allowColorChange"
      class="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity absolute z-10 max-w-xs bg-white border border-gray-100 text-start rounded-xl shadow-md after:absolute after:top-0 after:-start-4 after:w-4 after:h-full dark:bg-neutral-800 dark:border-neutral-700"
      role="tooltip"
    >
      <div class="p-4">
        <div class="flex gap-3">
          <button
            v-for="colorOption in PLAYER_COLORS.filter((c) => c !== 'white')"
            :key="colorOption"
            @click="changeColor(colorOption)"
            :class="[buttonBaseClasses, `bg-${colorOption}`]"
            :aria-label="`Select ${colorOption} color`"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
