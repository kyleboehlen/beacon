<script setup lang="ts">
import { ref } from 'vue'
import ColoredAvatar from '@/shared/ui/colored-avatar/ColoredAvatar.vue'
import TabsNav from '@/shared/ui/tabs-nav/TabsNav.vue'
import ContainerChrome from '@/shared/ui/container-chrome/ContainerChrome.vue'
import SideDrawer from '@/shared/ui/side-drawer/SideDrawer.vue'
import { Icon } from '@iconify/vue'
import { DashboardPanel } from '@/features/dashboard-panel'
import { EconPanel } from '@/features/econ-panel'
import { FleetPanel } from '@/features/fleet-panel'
import { IntelPanel } from '@/features/intel-panel'
import { BattlePanel } from '@/features/battle-panel'
import { GameSettingsPanel } from '@/features/game-settings-panel'
import { DashboardSideDrawerContent } from '@/features/dashboard-side-drawer-content'
import { useGameStore } from '@/entities/_game'
import { AttentionBadge } from '@/shared/ui/attention-badge'

const gameStore = useGameStore()
const activePanel = ref('dashboard')
const tabs = [
  { key: 'dashboard', label: 'Dashboard', disabled: () => !gameStore.hasRules && gameStore.isGameInstantiated },
  { key: 'econ', label: 'Econ', disabled: () => !gameStore.hasRules },
  { key: 'fleet', label: 'Fleet', disabled: () => !gameStore.hasRules },
  { key: 'intel', label: 'Intel', disabled: () => !gameStore.hasRules },
  { key: 'battle', label: 'Battle', disabled: () => !gameStore.hasRules },
]

const drawerRef = ref<InstanceType<typeof SideDrawer> | null>(null)
const isDrawerOpen = ref(false)

const openDrawer = () => {
  drawerRef.value?.open()
}

const handleDrawerOpened = () => {
  isDrawerOpen.value = true
}

const handleDrawerClosed = () => {
  isDrawerOpen.value = false
}
</script>

<template>
  <div class="w-full h-full flex flex-col">
    <!-- Header -->
    <header class="flex items-center gap-4 pl-2 pt-4 bg-black/40 h-auto relative z-50">
      <!-- Avatar (left) -->
      <div class="relative w-14 pb-2 overflow-visible">
        <ColoredAvatar class="w-full h-auto" :allow-color-change="true" />
      </div>

      <!-- Tabs -->
      <div class="flex-1 self-end">
        <TabsNav v-model="activePanel" :tabs="tabs">
          <template #tab-dashboard="{ tab }">
            <div class="relative">
              <span class="relative w-auto">
                {{ tab.label }}
                <AttentionBadge
                  v-if="!gameStore.isGameInstantiated"
                  label="Dashboard Tab"
                  variant="green"
                  class="right-[-14px] top-[-12px]"
                />
              </span>
            </div>
          </template>
        </TabsNav>
      </div>

      <!-- Settings Icon -->
      <button
        id="button-game-settings"
        class="flex-shrink-0 h-full w-12 mx-2 flex items-center justify-center transition-colors relative"
        :class="[
          activePanel === 'settings' ? 'text-white' : '',
          !gameStore.isGameInstantiated
            ? 'opacity-50 cursor-not-allowed text-red-950'
            : 'text-gray-400 hover:text-white',
        ]"
        type="button"
        aria-label="Settings"
        :aria-pressed="activePanel === 'settings'"
        :aria-disabled="!gameStore.isGameInstantiated"
        :disabled="!gameStore.isGameInstantiated"
        aria-controls="settings-panel"
        @click="activePanel = 'settings'"
      >
        <Icon
          icon="streamline-sharp:horizontal-toggle-button"
          class="h-9/10 w-full"
          aria-hidden="true"
        />
        <AttentionBadge
          v-if="gameStore.isGameInstantiated && !gameStore.hasRules"
          label="Settings Icon"
          variant="green"
          class="right-[-7px] top-[0px]"
        />
      </button>

      <!-- Hamburger Menu -->
      <button
        class="flex-shrink-0 h-full w-12 mx-2 mr-6 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
        type="button"
        aria-label="Menu"
        :aria-expanded="isDrawerOpen"
        @click="openDrawer"
      >
        <Icon icon="streamline-sharp:wrap-arch" class="h-full w-full" aria-hidden="true" />
      </button>
    </header>

    <!-- Panel Area -->
    <div class="flex-1 relative">
      <ContainerChrome :showSideDecorations="true">
        <!-- Dashboard Panel -->
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

        <!-- Econ Panel -->
        <EconPanel
          v-show="activePanel === 'econ'"
          id="tab-panel-econ"
          role="tabpanel"
          aria-labelledby="tab-econ"
          :aria-hidden="activePanel !== 'econ'"
          class="w-full h-full"
        />

        <!-- Fleet Panel -->
        <FleetPanel
          v-show="activePanel === 'fleet'"
          id="tab-panel-fleet"
          role="tabpanel"
          aria-labelledby="tab-fleet"
          :aria-hidden="activePanel !== 'fleet'"
          class="w-full h-full"
        />

        <!-- Intel Panel -->
        <IntelPanel
          v-show="activePanel === 'intel'"
          id="tab-panel-intel"
          role="tabpanel"
          aria-labelledby="tab-intel"
          :aria-hidden="activePanel !== 'intel'"
          class="w-full h-full"
        />

        <!-- Battle Panel -->
        <BattlePanel
          v-show="activePanel === 'battle'"
          id="tab-panel-battle"
          role="tabpanel"
          aria-labelledby="tab-battle"
          :aria-hidden="activePanel !== 'battle'"
          class="w-full h-full"
        />

        <!-- Settings Panel -->
        <GameSettingsPanel
          v-show="activePanel === 'settings'"
          id="button-game-settings-panel"
          role="region"
          aria-labelledby="settings-button"
          :aria-hidden="activePanel !== 'settings'"
          class="w-full h-full"
          @rulesCreated="activePanel = 'dashboard'"
        />
      </ContainerChrome>
    </div>

    <!-- Side Drawer -->
    <SideDrawer
      ref="drawerRef"
      header-id="menu-drawer-header"
      @opened="handleDrawerOpened"
      @closed="handleDrawerClosed"
    >
      <template #header>
        <h3 id="menu-drawer-header" class="font-bold text-gray-800 dark:text-white">Menu</h3>
      </template>

      <DashboardSideDrawerContent />
    </SideDrawer>
  </div>
</template>

<style scoped></style>
