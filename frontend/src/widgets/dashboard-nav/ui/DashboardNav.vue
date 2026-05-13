<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import { useGameStore } from '@/entities/_game'
import { ColoredAvatar } from '@/shared/ui/colored-avatar'
import { TabsNav } from '@/shared/ui/tabs-nav'
import { SideDrawer } from '@/shared/ui/side-drawer'
import { AttentionBadge } from '@/shared/ui/attention-badge'
import { DashboardSideDrawerContent } from '@/widgets/dashboard-side-drawer-content'

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const gameStore = useGameStore()
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
  <header class="flex items-center gap-4 pl-2 pt-4 bg-black/40 h-auto relative z-50">
    <div class="relative w-14 pb-2 overflow-visible">
      <ColoredAvatar class="w-full h-auto" :allow-color-change="true" />
    </div>

    <div class="flex-1 self-end">
      <TabsNav
        :model-value="props.modelValue"
        :tabs="tabs"
        @update:model-value="(value) => emit('update:modelValue', value)"
      >
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

    <button
      id="button-game-settings"
      class="flex-shrink-0 h-full w-12 mx-2 flex items-center justify-center transition-colors relative focus:outline-hidden focus-visible:[filter:drop-shadow(0_0_8px_white)]"
      :class="[
        props.modelValue === 'settings' ? 'text-white' : '',
        !gameStore.isGameInstantiated
          ? 'opacity-50 cursor-not-allowed text-red-950'
          : 'text-gray-400 hover:text-white',
      ]"
      type="button"
      aria-label="Settings"
      :aria-pressed="props.modelValue === 'settings'"
      :aria-disabled="!gameStore.isGameInstantiated"
      :disabled="!gameStore.isGameInstantiated"
      aria-controls="button-game-settings-panel"
      @click="emit('update:modelValue', 'settings')"
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

    <button
      class="flex-shrink-0 h-full w-12 mx-2 mr-6 flex items-center justify-center text-gray-400 hover:text-white transition-colors focus:outline-hidden focus-visible:[filter:drop-shadow(0_0_8px_white)]"
      type="button"
      aria-label="Menu"
      :aria-expanded="isDrawerOpen"
      @click="openDrawer"
    >
      <Icon icon="streamline-sharp:wrap-arch" class="h-full w-full" aria-hidden="true" />
    </button>
  </header>

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
</template>

<style scoped></style>
