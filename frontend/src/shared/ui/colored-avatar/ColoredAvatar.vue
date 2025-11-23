<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { computed, type PropType, ref } from 'vue'
import {
  getPlayerColorBorder,
  getPlayerColorText,
  getAccessabiltyColor,
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
const isPickerOpen = ref(false)

const borderColor = computed(() => getPlayerColorBorder(color.value))
const avatarColor = computed(() => getPlayerColorText(color.value))

const changeColor = (newColor: PlayerColor) => {
  color.value = newColor
  isPickerOpen.value = false
}

const togglePicker = () => {
  isPickerOpen.value = !isPickerOpen.value
}

const closePicker = () => {
  isPickerOpen.value = false
}

const handlePickerKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    closePicker()
  }
}
</script>

<template>
  <div :class="['inline-block rounded-full border-4 bg-transparent p-2', borderColor]">
    <button
      v-if="props.allowColorChange"
      @click="togglePicker"
      type="button"
      :aria-label="`Change color. Current color: ${getAccessabiltyColor(color)}`"
      :aria-expanded="isPickerOpen"
      aria-haspopup="dialog"
      class="flex items-center justify-center w-full h-full bg-transparent hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-full"
    >
      <Icon
        icon="si:rocket-duotone"
        class="w-full h-full"
        :class="avatarColor"
        data-test-id="avatar-icon"
        aria-hidden="true"
      />
    </button>

    <div v-else class="flex items-center justify-center w-full h-full bg-transparent">
      <Icon
        icon="si:rocket-duotone"
        class="w-full h-full"
        :class="avatarColor"
        data-test-id="avatar-icon"
        aria-hidden="true"
      />
    </div>

    <div
      v-if="props.allowColorChange && isPickerOpen"
      role="dialog"
      aria-label="Color picker"
      @keydown="handlePickerKeydown"
      class="absolute z-10 mt-2 p-4 bg-white border border-gray-100 rounded-xl shadow-md dark:bg-neutral-800 dark:border-neutral-700"
    >
      <div class="flex gap-3" role="group" aria-label="Available colors">
        <button
          v-for="colorOption in PLAYER_COLORS.filter((c) => c !== 'white')"
          :key="colorOption"
          @click="changeColor(colorOption)"
          type="button"
          :class="[
            'w-10 h-10 rounded-full transition-all',
            `bg-${colorOption}`,
            'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white',
            'hover:scale-110',
            { 'ring-2 ring-white ring-offset-2': color === colorOption },
          ]"
          :aria-label="`Select ${getAccessabiltyColor(colorOption)} color`"
          :aria-pressed="color === colorOption"
        >
          <span v-if="color === colorOption" class="sr-only">(current)</span>
        </button>
      </div>
      <button
        @click="closePicker"
        type="button"
        class="mt-3 w-full text-sm text-gray-600 dark:text-gray-400 hover:underline"
      >
        Close
      </button>
    </div>

    <!-- Backdrop to close picker when clicking outside -->
    <div
      v-if="props.allowColorChange && isPickerOpen"
      @click="closePicker"
      class="fixed inset-0 z-0"
      aria-hidden="true"
    />
  </div>
</template>
