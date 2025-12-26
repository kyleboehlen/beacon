<script setup lang="ts">
import { onMounted, ref } from 'vue'
import ApexCharts from 'apexcharts'
import { BasicCard } from '@/shared/ui/basic-card'

const chartContainer = ref<HTMLDivElement | null>(null)

onMounted(() => {
  if (!chartContainer.value) return

  const chart = new ApexCharts(chartContainer.value, {
    chart: {
      type: 'radar',
      height: 350,
      background: 'transparent',
      toolbar: {
        show: false,
      },
    },
    series: [
      {
        name: 'Current Level',
        data: [85, 72, 90, 65, 78, 88],
      },
      {
        name: 'Required Level',
        data: [90, 80, 85, 75, 85, 90],
      },
    ],
    xaxis: {
      categories: ['Weapons', 'Shields', 'Propulsion', 'Mining', 'Research', 'Construction'],
      labels: {
        style: {
          colors: ['#9ca3af', '#9ca3af', '#9ca3af', '#9ca3af', '#9ca3af', '#9ca3af'],
          fontSize: '12px',
        },
      },
    },
    yaxis: {
      show: false,
      min: 0,
      max: 100,
    },
    colors: ['#3b82f6', '#f59e0b'],
    stroke: {
      width: 2,
    },
    fill: {
      opacity: 0.2,
    },
    markers: {
      size: 4,
      colors: ['#3b82f6', '#f59e0b'],
      strokeWidth: 0,
    },
    legend: {
      position: 'top',
      labels: {
        colors: '#ffffff',
      },
    },
    plotOptions: {
      radar: {
        polygons: {
          strokeColors: '#374151',
          fill: {
            colors: ['transparent', 'transparent'],
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
  <BasicCard title="Technology Progress">
    <div ref="chartContainer"></div>
  </BasicCard>
</template>

<style scoped></style>
