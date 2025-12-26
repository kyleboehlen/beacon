<script setup lang="ts">
import { onMounted, ref } from 'vue'
import ApexCharts from 'apexcharts'
import { BasicCard } from '@/shared/ui/basic-card'

const chartContainer = ref<HTMLDivElement | null>(null)

onMounted(() => {
  if (!chartContainer.value) return
  const chart = new ApexCharts(chartContainer.value, {
    chart: {
      type: 'area',
      height: 300,
      background: 'transparent',
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    series: [
      {
        name: 'Population',
        data: [2300, 2450, 2610, 2800, 3050, 3280, 3560, 3890, 4250, 4680, 5120, 5590],
      },
      {
        name: 'Maintenance Cost',
        data: [450, 480, 510, 550, 600, 650, 710, 780, 850, 930, 1020, 1120],
      },
    ],
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      labels: {
        style: {
          colors: '#9ca3af',
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: '#9ca3af',
        },
      },
    },
    colors: ['#10b981', '#ef4444'],
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0.1,
      },
    },
    legend: {
      position: 'top',
      labels: {
        colors: '#ffffff',
      },
    },
    dataLabels: {
      enabled: false,
    },
    grid: {
      borderColor: '#374151',
      strokeDashArray: 4,
    },
    tooltip: {
      theme: 'dark',
    },
  })

  chart.render()
})
</script>

<template>
  <BasicCard title="Colony Growth & Maintenance">
    <div ref="chartContainer"></div>
  </BasicCard>
</template>

<style scoped></style>
