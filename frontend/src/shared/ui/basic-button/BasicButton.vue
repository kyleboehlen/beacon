<script setup lang="ts">
interface Props {
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const handleClick = (event: MouseEvent) => {
  if (!props.disabled) {
    emit('click', event)
  }
}
</script>

<template>
  <button
    :disabled="props.disabled"
    :class="[
      'px-6 py-4 text-lg font-medium text-center transition-all duration-200',
      'focus:outline-none border-b-1',
      props.disabled
        ? 'cursor-not-allowed text-white/40 bg-white/5 border-b-transparent'
        : 'text-white bg-white/10 hover:bg-white/20 border-b-transparent hover:border-b-white',
    ]"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<style scoped>
button {
  clip-path: polygon(12px 0, calc(100% - 12px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 8px), 0 8px);
}
</style>
