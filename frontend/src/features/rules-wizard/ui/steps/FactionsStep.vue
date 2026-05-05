<script setup lang="ts">
import { useRulesConfigStore, RuleCategory } from '@/entities/rules'
import BooleanRuleRow from '../components/BooleanRuleRow.vue'

const store = useRulesConfigStore()
const rules = store.rulesForCategory(RuleCategory.Factions)
</script>

<template>
  <div class="w-full h-full flex flex-col">
    <div class="mb-4">
      <h2 class="text-2xl font-bold text-white">Factions</h2>
      <p class="text-white/70 mt-1">Enable faction-specific rules and abilities</p>
    </div>

    <div role="group" aria-label="Factions rules" class="flex-1 overflow-y-auto space-y-3">
      <BooleanRuleRow
        v-for="rule in rules"
        :key="rule.key"
        :rule-key="rule.key"
        :value="rule.value"
        :description="rule.description"
        :reference-number="rule.referenceNumber"
        :rule-page="rule.rulePage"
        :enabled="rule.enabled"
        :locked="store.isLocked"
        @toggle="store.toggleRuleValue"
      />
    </div>
  </div>
</template>