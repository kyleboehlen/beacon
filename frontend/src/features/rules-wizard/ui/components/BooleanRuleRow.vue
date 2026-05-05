<script setup lang="ts">
import { computed } from 'vue'
import { RuleReferenceLink } from '@/shared/ui/rule-reference-link'
import { camelCaseToProperCase } from '@/shared/lib/utils/strings'
import type { RuleKey } from '@/entities/rules'

const props = defineProps<{
  ruleKey: RuleKey
  value: boolean
  description: string
  referenceNumber: string
  rulePage: number
  enabled: boolean
  locked: boolean
}>()

const emit = defineEmits<{
  toggle: [key: RuleKey]
}>()

const displayName = computed(() => camelCaseToProperCase(props.ruleKey))
</script>

<template>
  <div
    class="p-4 rounded-md transition-all border-2"
    :class="{
      'bg-white/10 hover:bg-white/15 border-green-500': props.value && !props.locked,
      'bg-white/10 hover:bg-white/15 border-transparent': !props.value,
      'opacity-50': !props.enabled,
      'cursor-pointer': props.enabled && !props.locked,
      'cursor-not-allowed': !props.enabled || props.locked,
    }"
    @click="props.enabled && !props.locked && emit('toggle', props.ruleKey)"
  >
    <div class="flex items-start justify-between gap-4">
      <div class="flex-1">
        <div class="flex items-center gap-2">
          <h3 class="text-lg font-semibold text-white">{{ displayName }}</h3>
          <span @click.stop>
            <RuleReferenceLink :reference-number="props.referenceNumber" :page="props.rulePage" />
          </span>
        </div>
        <p class="text-white/70 mt-1">{{ props.description }}</p>
      </div>

      <button
        type="button"
        role="switch"
        :aria-checked="props.value"
        :aria-label="`Toggle ${props.ruleKey}`"
        :disabled="!props.enabled || props.locked"
        class="shrink-0 mt-1 relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-white/30 disabled:opacity-50 disabled:cursor-not-allowed"
        :class="props.value ? 'bg-green-600' : 'bg-white/20'"
        @click.stop="emit('toggle', props.ruleKey)"
      >
        <span
          class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
          :class="props.value ? 'translate-x-6' : 'translate-x-1'"
        />
      </button>
    </div>
  </div>
</template>