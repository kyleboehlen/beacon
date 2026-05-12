<script setup lang="ts">
import { BasicCard } from '@/shared/ui/basic-card'

const missions = [
  {
    id: 'M-4782',
    name: 'Sector Patrol Alpha',
    status: 'Active',
    progress: 75,
    fleet: 'Squadron-7',
    eta: '2h 15m',
  },
  {
    id: 'M-4783',
    name: 'Resource Collection',
    status: 'Active',
    progress: 45,
    fleet: 'Mining-3',
    eta: '4h 32m',
  },
  {
    id: 'M-4784',
    name: 'Planetary Survey',
    status: 'Pending',
    progress: 0,
    fleet: 'Scout-12',
    eta: '8h 00m',
  },
  {
    id: 'M-4785',
    name: 'Defense Drill',
    status: 'Completed',
    progress: 100,
    fleet: 'Defense-1',
    eta: 'Complete',
  },
  {
    id: 'M-4786',
    name: 'Trade Route Escort',
    status: 'Active',
    progress: 60,
    fleet: 'Squadron-4',
    eta: '3h 45m',
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Active':
      return 'text-green-400'
    case 'Pending':
      return 'text-yellow-400'
    case 'Completed':
      return 'text-blue-400'
    default:
      return 'text-gray-400'
  }
}

const getProgressColor = (progress: number) => {
  if (progress === 0) return 'bg-gray-600'
  if (progress < 50) return 'bg-yellow-500'
  if (progress < 100) return 'bg-green-500'
  return 'bg-blue-500'
}
</script>

<template>
  <BasicCard title="Active Missions">
    <div class="overflow-x-auto">
      <table class="w-full text-sm text-left">
        <thead class="text-xs uppercase text-gray-400 border-b border-white/10">
          <tr>
            <th scope="col" class="px-4 py-3">Mission ID</th>
            <th scope="col" class="px-4 py-3">Name</th>
            <th scope="col" class="px-4 py-3">Status</th>
            <th scope="col" class="px-4 py-3">Progress</th>
            <th scope="col" class="px-4 py-3">Fleet</th>
            <th scope="col" class="px-4 py-3">ETA</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="mission in missions"
            :key="mission.id"
            class="border-b border-white/5 hover:bg-white/5 transition-colors"
          >
            <td class="px-4 py-3 font-mono text-gray-300">{{ mission.id }}</td>
            <td class="px-4 py-3 text-white font-medium">{{ mission.name }}</td>
            <td class="px-4 py-3">
              <span :class="getStatusColor(mission.status)" class="font-semibold">
                {{ mission.status }}
              </span>
            </td>
            <td class="px-4 py-3">
              <div class="flex items-center gap-2">
                <div class="w-full bg-gray-700 rounded-full h-2">
                  <div
                    :class="getProgressColor(mission.progress)"
                    class="h-2 rounded-full transition-all"
                    :style="{ width: `${mission.progress}%` }"
                  ></div>
                </div>
                <span class="text-gray-400 text-xs min-w-[3ch]">{{ mission.progress }}%</span>
              </div>
            </td>
            <td class="px-4 py-3 text-gray-300">{{ mission.fleet }}</td>
            <td class="px-4 py-3 text-gray-300 font-mono">{{ mission.eta }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </BasicCard>
</template>

<style scoped></style>
