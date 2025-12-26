<script setup lang="ts">
import { onMounted, ref } from 'vue'
import ApexCharts from 'apexcharts'
import { BasicCard } from '@/shared/ui/basic-card'

const chartContainer = ref<HTMLDivElement | null>(null)

onMounted(() => {
  if (!chartContainer.value) return

  const chart = new ApexCharts(chartContainer.value, {
    chart: {
      type: 'donut',
      height: 300,
      background: 'transparent',
      toolbar: {
        show: false,
      },
    },
    series: [35, 25, 20, 15, 5],
    labels: ['Corvettes', 'Frigates', 'Destroyers', 'Cruisers', 'Battleships'],
    colors: ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444'],
    legend: {
      position: 'bottom',
      labels: {
        colors: '#ffffff',
      },
    },
    dataLabels: {
      enabled: true,
      style: {
        colors: ['#ffffff'],
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: '65%',
          labels: {
            show: true,
            total: {
              show: true,
              label: 'Total Ships',
              color: '#ffffff',
              fontSize: '14px',
            },
            value: {
              color: '#ffffff',
              fontSize: '22px',
              fontWeight: 600,
            },
          },
        },
      },
    },
    tooltip: {
      theme: 'dark',
    },
  })

  chart.render()
})
</script>

<template>
  <BasicCard title="Fleet Composition">
    <div ref="chartContainer"></div>
  </BasicCard>
</template>

<style scoped></style>
