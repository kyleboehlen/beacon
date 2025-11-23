<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { computed, type PropType, ref } from 'vue'

const props = defineProps({
  initialColor: {
    type: String as PropType<'red-700' | 'green-700' | 'yellow-300' | 'blue-700' | 'white'>,
    default: 'white',
    validator: (value: string) =>
      ['red-700', 'green-700', 'yellow-300', 'blue-700', 'white'].includes(value),
  },
  allowColorChange: {
    type: Boolean,
    default: true,
  },
})

const color = ref(props.initialColor)

const borderColor = computed(() => {
  const colorMap: Record<string, string> = {
    'red-700': 'border-red-700',
    'green-700': 'border-green-700',
    'yellow-300': 'border-yellow-300',
    'blue-700': 'border-blue-700',
    white: 'border-white',
  }
  return colorMap[color.value] || 'border-white'
})

const avatarColor = computed(() => {
  const colorMap: Record<string, string> = {
    'red-700': 'text-red-700',
    'green-700': 'text-green-700',
    'yellow-300': 'text-yellow-300',
    'blue-700': 'text-blue-700',
    white: 'text-white',
  }
  return colorMap[color.value] || 'text-white'
})

const buttonBaseClasses = 'w-10 h-10 rounded-full transition-all hover:scale-110'

const changeColor = (newColor: string) => {
  color.value = newColor as typeof props.initialColor
}
</script>

<template>
  <div
    class="hs-tooltip [--trigger:click] sm:[--placement:right] inline-block rounded-full border-4 bg-transparent p-2"
    :class="{
      [borderColor]: true,
      'hover:cursor-pointer': props.allowColorChange,
    }"
  >
    <div
      class="hs-tooltip-toggle flex items-center justify-center w-full h-full bg-transparent"
      tabindex="0"
    >
      <Icon icon="si:rocket-duotone" class="w-full h-full" :class="avatarColor" />
    </div>

    <div
      v-if="props.allowColorChange"
      class="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity absolute z-10 max-w-xs bg-white border border-gray-100 text-start rounded-xl shadow-md after:absolute after:top-0 after:-start-4 after:w-4 after:h-full dark:bg-neutral-800 dark:border-neutral-700"
      role="tooltip"
    >
      <div class="p-4">
        <div class="flex gap-3">
          <button
            @click="changeColor('red-700')"
            :class="[buttonBaseClasses, 'bg-red-700']"
            aria-label="Select red color"
          />
          <button
            @click="changeColor('green-700')"
            :class="[buttonBaseClasses, 'bg-green-700']"
            aria-label="Select green color"
          />
          <button
            @click="changeColor('yellow-300')"
            :class="[buttonBaseClasses, 'bg-yellow-300']"
            aria-label="Select yellow color"
          />
          <button
            @click="changeColor('blue-700')"
            :class="[buttonBaseClasses, 'bg-blue-700']"
            aria-label="Select blue color"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
