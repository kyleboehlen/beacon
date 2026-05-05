<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import { useRulesConfigStore, RuleCategory } from '@/entities/rules'
import { camelCaseToProperCase } from '@/shared/lib/utils/strings'

const store = useRulesConfigStore()

const categories = computed(() => [
  { id: RuleCategory.Basic, label: 'Basic', rules: store.rulesForCategory(RuleCategory.Basic).value },
  { id: RuleCategory.Beacon, label: 'Beacon', rules: store.rulesForCategory(RuleCategory.Beacon).value },
  { id: RuleCategory.Factions, label: 'Factions', rules: store.rulesForCategory(RuleCategory.Factions).value },
  { id: RuleCategory.Optional, label: 'Optional', rules: store.rulesForCategory(RuleCategory.Optional).value },
])
</script>

<template>
  <div class="w-full h-full flex flex-col">
    <div class="mb-4">
      <h2 class="text-2xl font-bold text-white">Summary</h2>
      <p class="text-white/70 mt-1">Review your configuration before saving</p>
    </div>

    <div class="flex-1 overflow-y-auto space-y-5">
      <div v-for="category in categories" :key="category.id">
        <h3 class="text-sm font-semibold uppercase tracking-wider text-white/50 mb-2 pb-1 border-b border-white/10">
          {{ category.label }}
        </h3>
        <div class="grid grid-cols-2 gap-x-6 gap-y-1">
          <div
            v-for="rule in category.rules"
            :key="rule.key"
            class="flex items-center gap-2"
            :class="!rule.enabled ? 'opacity-30' : ''"
            :aria-disabled="!rule.enabled ? 'true' : undefined"
          >
            <Icon
              v-if="rule.value && rule.enabled"
              icon="mdi:check-circle"
              class="shrink-0 text-green-400 size-4"
              aria-hidden="true"
            />
            <Icon
              v-else
              icon="mdi:minus-circle-outline"
              class="shrink-0 text-white/30 size-4"
              aria-hidden="true"
            />
            <span class="sr-only">{{ rule.value && rule.enabled ? 'On' : 'Off' }}:</span>
            <span
              class="text-sm"
              :class="rule.value && rule.enabled ? 'text-white' : 'text-white/40'"
            >
              {{ camelCaseToProperCase(rule.key) }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>