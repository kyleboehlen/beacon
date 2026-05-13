<script setup lang="ts">
import { ref } from 'vue'
import { StarryBackground } from '@/shared/ui/starry-background'
import { ContainerChrome } from '@/shared/ui/container-chrome'
import { useGameStore } from '@/entities/_game'
import { useHealthCheck } from '@/entities/health-check'
import { DashboardNav } from '@/widgets/dashboard-nav'
import { DashboardPanel } from '@/widgets/dashboard-panel'
import { EconPanel } from '@/widgets/econ-panel'
import { FleetPanel } from '@/widgets/fleet-panel'
import { IntelPanel } from '@/widgets/intel-panel'
import { BattlePanel } from '@/widgets/battle-panel'
import { GameSettingsPanel } from '@/widgets/game-settings-panel'

const { consoleLogHealthStatus } = useHealthCheck()
consoleLogHealthStatus()

const gameStore = useGameStore()
const activePanel = ref('dashboard')
</script>

<template>
  <StarryBackground class="w-full h-screen">
    <div class="w-full h-full flex flex-col">
      <DashboardNav v-model="activePanel" />

      <div class="flex-1 relative">
        <ContainerChrome :showSideDecorations="true">
          <DashboardPanel
            v-show="activePanel === 'dashboard'"
            id="tab-panel-dashboard"
            role="tabpanel"
            aria-labelledby="tab-dashboard"
            :aria-hidden="activePanel !== 'dashboard'"
            class="w-full h-full"
            @startScenario="
              () => {
                gameStore.setGame()
                activePanel = 'settings'
              }
            "
          />

          <EconPanel
            v-show="activePanel === 'econ'"
            id="tab-panel-econ"
            role="tabpanel"
            aria-labelledby="tab-econ"
            :aria-hidden="activePanel !== 'econ'"
            class="w-full h-full"
          />

          <FleetPanel
            v-show="activePanel === 'fleet'"
            id="tab-panel-fleet"
            role="tabpanel"
            aria-labelledby="tab-fleet"
            :aria-hidden="activePanel !== 'fleet'"
            class="w-full h-full"
          />

          <IntelPanel
            v-show="activePanel === 'intel'"
            id="tab-panel-intel"
            role="tabpanel"
            aria-labelledby="tab-intel"
            :aria-hidden="activePanel !== 'intel'"
            class="w-full h-full"
          />

          <BattlePanel
            v-show="activePanel === 'battle'"
            id="tab-panel-battle"
            role="tabpanel"
            aria-labelledby="tab-battle"
            :aria-hidden="activePanel !== 'battle'"
            class="w-full h-full"
          />

          <GameSettingsPanel
            v-show="activePanel === 'settings'"
            id="button-game-settings-panel"
            role="region"
            aria-labelledby="button-game-settings"
            :aria-hidden="activePanel !== 'settings'"
            class="w-full h-full"
            @rulesCreated="activePanel = 'dashboard'"
          />
        </ContainerChrome>
      </div>
    </div>
  </StarryBackground>
</template>
