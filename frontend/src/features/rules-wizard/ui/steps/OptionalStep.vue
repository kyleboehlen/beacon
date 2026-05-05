<script setup lang="ts">
import { useRulesConfigStore, RuleCategory } from '@/entities/rules'
import BooleanRuleRow from '../components/BooleanRuleRow.vue'

const store = useRulesConfigStore()
const rules = store.rulesForCategory(RuleCategory.Optional)
</script>

<template>
  <div class="w-full h-full flex flex-col">
    <div class="mb-4">
      <h2 class="text-2xl font-bold text-white">Optional Rules</h2>
      <p class="text-white/70 mt-1">Additional rules that change gameplay in unique ways</p>
    </div>

    <div role="group" aria-label="Optional rules" class="flex-1 overflow-y-auto space-y-3">
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