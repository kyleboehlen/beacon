<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { computed, type PropType, ref, onMounted, onUnmounted } from 'vue'
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
const isOpen = ref(false)
const containerRef = ref<HTMLElement | null>(null)

const borderColor = computed(() => getPlayerColorBorder(color.value))
const avatarColor = computed(() => getPlayerColorText(color.value))

const buttonBaseClasses =
  'w-10 h-10 rounded-full transition-all hover:scale-110'

const changeColor = (newColor: PlayerColor) => {
  color.value = newColor
  isOpen.value = false
}

const toggle = () => {
  if (props.allowColorChange) isOpen.value = !isOpen.value
}

const handleClickOutside = (event: MouseEvent) => {
  if (containerRef.value && !containerRef.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => document.addEventListener('mousedown', handleClickOutside))
onUnmounted(() => document.removeEventListener('mousedown', handleClickOutside))
</script>

<template>
  <div
    ref="containerRef"
    :class="[
      'inline-block rounded-full border-4 bg-transparent p-2 relative',
      { 'hover:cursor-pointer': props.allowColorChange },
      borderColor,
    ]"
    @click="toggle"
  >
    <div class="flex items-center justify-center w-full h-full bg-transparent">
      <Icon
        icon="si:rocket-duotone"
        class="w-full h-full"
        :class="avatarColor"
        aria-hidden="true"
      />
    </div>

    <div
      v-if="props.allowColorChange"
      v-show="isOpen"
      class="absolute z-50 -top-4 left-full ml-2 bg-white border border-gray-100 rounded-xl shadow-md dark:bg-neutral-800 dark:border-neutral-700"
      aria-hidden="true"
    >
      <div class="p-4">
        <div class="flex gap-3">
          <button
            v-for="colorOption in PLAYER_COLORS.filter((c) => c !== 'white')"
            :key="colorOption"
            tabindex="-1"
            @click.stop="changeColor(colorOption)"
            :class="[buttonBaseClasses, `bg-${colorOption}`]"
            :aria-label="`Select ${getAccessibilityColor(colorOption)} color`"
          />
        </div>
      </div>
    </div>
  </div>
</template>
