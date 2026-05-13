<script setup lang="ts">
import { computed } from 'vue'
import { useGameStore } from '@/entities/_game'
import { TechLevelTree } from '@/shared/ui/tech-level-tree'
import type { LevelNode } from '@/shared/ui/tech-level-tree'

const gameStore = useGameStore()

const buildNodes = (
  startingLevel: number,
  currentLevel: number,
  upgradeCosts: number[],
  levelNotes: string[] | null,
  techDescription: string | null,
): LevelNode[] => {
  const clampedStarting = Math.max(0, startingLevel)
  const totalLevels = Math.max(1, clampedStarting + upgradeCosts.length)
  const purchasedThrough = Math.max(0, Math.min(currentLevel, totalLevels))

  return Array.from({ length: totalLevels }, (_, levelIndex) => {
    const state: LevelNode['state'] = levelIndex < purchasedThrough ? 'purchased' : 'disabled'

    const costIndex = levelIndex - clampedStarting
    const cost = costIndex >= 0 ? upgradeCosts[costIndex] : undefined
    const rawDescription = costIndex >= 0 ? levelNotes?.[costIndex] : undefined
    const description = typeof rawDescription === 'string' && rawDescription.length > 0
      ? rawDescription
      : costIndex < 0
        ? techDescription ?? undefined
        : undefined

    return { state, cost, description }
  })
}

const techRows = computed(() =>
  gameStore.techState.map((entry, index) => ({
    key: entry.definition.key,
    name: entry.definition.displayName,
    description: entry.definition.notes ?? undefined,
    nodes: buildNodes(
      entry.definition.startingLevel,
      entry.currentLevel,
      entry.definition.upgradeCosts,
      entry.definition.levelNotes,
      entry.definition.notes,
    ),
    colorIndex: index,
  }))
)
</script>

<template>
  <div id="dashboard-tech-grid" class="space-y-3">
    <TechLevelTree
      v-for="tech in techRows"
      :key="tech.key"
      :name="tech.name"
      :description="tech.description"
      :nodes="tech.nodes"
      :interactive="false"
      :color-index="tech.colorIndex"
    />
  </div>
</template>

<style scoped></style>
