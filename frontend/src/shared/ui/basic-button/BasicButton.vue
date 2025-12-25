<script setup lang="ts">
// NOTE: aria labels are not reactive, use multiple buttons with v-show or v-if if changing aria
// labels or types is desired.
interface Props {
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  ariaLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  type: 'button',
  ariaLabel: undefined,
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const handleClick = (event: MouseEvent) => {
  if (!props.disabled) {
    emit('click', event)
  }
}

const handleKeyDown = (event: KeyboardEvent) => {
  // Allow keyboard activation with Enter or Space
  if ((event.key === 'Enter' || event.key === ' ') && !props.disabled) {
    event.preventDefault()
    // Emit click event - the actual MouseEvent will be created by the native click
    ;(event.target as HTMLElement)?.click()
  }
}
</script>

<template>
  <button
    :type="props.type"
    :disabled="props.disabled"
    :aria-disabled="props.disabled"
    :aria-label="props.ariaLabel"
    :class="[
      'px-6 py-4 text-lg font-medium text-center transition-all duration-200',
      'focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black',
      'border-b-[1px]',
      props.disabled
        ? 'cursor-not-allowed text-white/40 bg-white/5 border-b-transparent'
        : 'text-white bg-white/10 hover:bg-white/20 border-b-transparent hover:border-b-white',
    ]"
    @click="handleClick"
    @keydown="handleKeyDown"
  >
    <slot />
  </button>
</template>

<style scoped>
button {
  clip-path: polygon(12px 0, calc(100% - 12px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 8px), 0 8px);
}
</style>
