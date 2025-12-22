<script setup lang="ts">
interface Props {
  innerStyles?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  innerStyles: 'bg-gray-900 hover:bg-gray-800',
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
      'flex flex-row items-center justify-center p-0.5',
      props.disabled
        ? 'bg-white/40 cursor-not-allowed'
        : 'bg-white/80 hover:cursor-pointer hover:bg-white',
    ]"
    @click="handleClick"
  >
    <span
      :class="[
        'text-white flex-grow self-stretch flex-1 flex flex-row items-center justify-center',
        props.disabled ? 'opacity-50' : props.innerStyles,
      ]"
    >
      <slot />
    </span>
  </button>
</template>

<style scoped>
button {
  clip-path: polygon(12px 0, calc(100% - 12px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 8px), 0 8px);
}

span {
  clip-path: polygon(12px 0, calc(100% - 12px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 8px), 0 8px);
}
</style>
