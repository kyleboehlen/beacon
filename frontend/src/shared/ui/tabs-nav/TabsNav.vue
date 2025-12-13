<script setup lang="ts">
import { ref, nextTick } from 'vue'

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

// Validate all tab keys are unique in development mode
if (import.meta.env.DEV) {
  const keys = props.tabs.map(tab => tab.key)
  const uniqueKeys = new Set(keys)
  if (keys.length !== uniqueKeys.size) {
    console.error('[TabsNav] Duplicate tab keys detected. All tab keys must be unique:', keys)
  }
}

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const tabRefs = ref<Record<string, HTMLButtonElement>>({})

const selectTab = (key: string) => {
  emit('update:modelValue', key)
}

const handleKeyDown = (event: KeyboardEvent, currentIndex: number) => {
  let newIndex = currentIndex

  switch (event.key) {
    case 'ArrowRight':
      event.preventDefault()
      newIndex = (currentIndex + 1) % props.tabs.length
      break
    case 'ArrowLeft':
      event.preventDefault()
      newIndex = (currentIndex - 1 + props.tabs.length) % props.tabs.length
      break
    case 'Home':
      event.preventDefault()
      newIndex = 0
      break
    case 'End':
      event.preventDefault()
      newIndex = props.tabs.length - 1
      break
    default:
      return
  }

  const newTabKey = props.tabs[newIndex].key
  selectTab(newTabKey)
  // Focus the new tab after selection
  nextTick(() => {
    tabRefs.value[newTabKey]?.focus()
  })
}
</script>

<template>
  <nav
    class="relative z-0 flex border-b border-white/20 w-full"
    role="tablist"
    aria-orientation="horizontal"
  >
    <button
      v-for="(tab, index) in props.tabs"
      :key="tab.key"
      :ref="(el) => { if (el) tabRefs[tab.key] = el as HTMLButtonElement }"
      :id="`tab-${tab.key}`"
      type="button"
      :tabindex="modelValue === tab.key ? 0 : -1"
      :class="[
        'relative flex-1 py-4 px-6 text-sm font-medium text-center transition-all duration-200',
        'focus:z-10 focus:outline-none',
        'disabled:opacity-50 disabled:pointer-events-none',
        tab.styles || '',
        modelValue === tab.key
          ? 'bg-white/10 text-white border-b-2 border-b-white'
          : 'bg-transparent text-gray-400 hover:text-gray-200 hover:bg-white/5 border-b-2 border-b-transparent',
         modelValue === tab.key
          ? tab.activeStyles || ''
          : tab.inactiveStyles || '',
      ]"
      :aria-selected="modelValue === tab.key"
      :aria-controls="`tab-panel-${tab.key}`"
      role="tab"
      @click="selectTab(tab.key)"
      @keydown="handleKeyDown($event, index)"
      :style="{
        clipPath: 'polygon(18px 0, calc(100% - 18px) 0, 100% 12px, 100% 100%, 0 100%, 0 12px)'
      }"
    >
      {{ tab.label }}
    </button>
  </nav>
</template>

<style scoped></style>
