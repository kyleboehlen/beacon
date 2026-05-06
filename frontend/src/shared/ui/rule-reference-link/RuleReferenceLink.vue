<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  referenceNumber: string
  label?: string
  page?: number
}>()

const pdfFile = '/SE_AllGoodTHings_MasterRulebook_v8.pdf'
const viewerBase = '/pdfjs/web/viewer.html'

const targetUrl = computed(() =>
  props.page
    ? `${viewerBase}?file=${encodeURIComponent(pdfFile)}#page=${props.page}`
    : `${viewerBase}?file=${encodeURIComponent(pdfFile)}`,
)
</script>

<template>
  <a
    :href="targetUrl"
    target="_blank"
    rel="noopener noreferrer"
    class="font-mono text-xs text-cyan-400/70 underline decoration-dotted cursor-pointer hover:text-cyan-300 focus:outline-hidden focus-visible:text-cyan-300 focus-visible:[filter:drop-shadow(0_0_6px_rgb(34,211,238))]"
    :aria-label="`Rule reference ${props.referenceNumber} - opens rulebook PDF in new tab`"
  >
    <slot>
      {{ props.referenceNumber }}
    </slot>
  </a>
</template>