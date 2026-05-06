<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { ref, watch, nextTick, onBeforeUnmount } from 'vue'
import { RuleReferenceLink } from '@/shared/ui/rule-reference-link'

const model = defineModel<boolean>({ required: true })

const rootRef = ref<HTMLElement | null>(null)
const panelRef = ref<HTMLElement | null>(null)

const toggle = (event: Event) => {
  event.stopPropagation()
  model.value = !model.value
}

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    toggle(event)
  }
  if (event.key === 'Escape' && model.value) {
    model.value = false
  }
}

const onClickOutside = (event: MouseEvent) => {
  if (rootRef.value && !rootRef.value.contains(event.target as Node)) {
    model.value = false
  }
}

watch(model, async (open) => {
  if (open) {
    document.addEventListener('click', onClickOutside, { capture: true })
    await nextTick()
    panelRef.value?.focus()
  } else {
    document.removeEventListener('click', onClickOutside, { capture: true })
  }
}, { immediate: true })

onBeforeUnmount(() => {
  document.removeEventListener('click', onClickOutside, { capture: true })
})
</script>

<template>
  <div ref="rootRef" class="mt-3 flex flex-col items-center">
    <button
      @click="toggle"
      @keydown="handleKeydown"
      class="text-white/40 hover:text-white/70 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded-full p-2"
      :aria-expanded="model"
      aria-controls="splash-info-panel"
      aria-label="About B.E.A.C.O.N."
    >
      <Icon icon="mdi:information-outline" class="size-6" aria-hidden="true" />
    </button>

    <div
      v-if="model"
      id="splash-info-panel"
      ref="panelRef"
      tabindex="-1"
      role="region"
      aria-label="About B.E.A.C.O.N."
      class="mt-3 max-w-md bg-black/80 border border-white/20 rounded-lg p-5 text-sm text-white/70 space-y-3 focus:outline-none"
    >
      <p>
        <strong class="text-white/90">B.E.A.C.O.N.</strong> is a digital companion app for
        <em>Space Empires: All Good Things</em>. It can be used for simply tracking bookkeeping with the physical game,
        or virtually playing the entire game. It isn't meant to be a complete replacement for all of the physical game
        pieces, and is still meant to be played with friends in person.
      </p>
      <p>
        <RuleReferenceLink reference-number="Master Rulebook" />
      </p>
      <p class="text-white/40 italic">
        Coming soon: Interactive Rules Tutorial
      </p>
    </div>
  </div>
</template>