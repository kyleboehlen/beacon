<script setup lang="ts">
interface Tab {
  key: string
  label: string
  styles?: string
  activeStyles?: string
  inactiveStyles?: string
}

const props = defineProps<{
  tabs: Tab[]
  modelValue: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const selectTab = (key: string) => {
  emit('update:modelValue', key)
}
</script>

<template>
  <nav
    class="relative z-0 flex border-b border-white/20 w-full"
    role="tablist"
    aria-orientation="horizontal"
  >
    <button
      v-for="tab in props.tabs"
      :key="tab.key"
      type="button"
      :class="[
        'relative flex-1 py-4 px-6 text-sm font-medium text-center transition-all duration-200',
        'focus:z-10 focus:outline-none',
        'disabled:opacity-50 disabled:pointer-events-none',
        tab.styles || '',
        modelValue === tab.key
          ? 'bg-white/10 text-white border-b-1 border-b-white'
          : 'bg-transparent text-gray-400 hover:text-gray-200 hover:bg-white/5 border-b-2 border-b-transparent',
         modelValue === tab.key
          ? tab.activeStyles || ''
          : tab.inactiveStyles || '',
      ]"
      :aria-selected="modelValue === tab.key"
      :aria-controls="`tab-panel-${tab.key}`"
      role="tab"
      @click="selectTab(tab.key)"
      :style="{
        clipPath: 'polygon(18px 0, calc(100% - 18px) 0, 100% 12px, 100% 100%, 0 100%, 0 12px)'
      }"
    >
      {{ tab.label }}
    </button>
  </nav>
</template>

<style scoped></style>
