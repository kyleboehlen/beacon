<script setup lang="ts">
const props = defineProps<{
  referenceNumber: string
  label?: string
  page?: number
}>()

const pdfFile = '/SE_AllGoodTHings_MasterRulebook_v8.pdf'
const viewerBase = '/pdfjs/web/viewer.html'

const targetUrl = props.page
  ? `${viewerBase}?file=${encodeURIComponent(pdfFile)}#page=${props.page}`
  : `${viewerBase}?file=${encodeURIComponent(pdfFile)}`
</script>

<template>
  <a
    :href="targetUrl"
    target="_blank"
    rel="noopener noreferrer"
    class="font-mono text-xs text-cyan-400/70 underline decoration-dotted cursor-pointer hover:text-cyan-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50 rounded-sm"
    :aria-label="`Rule reference ${props.referenceNumber} - opens rulebook PDF in new tab`"
  >
    <slot>
      {{ props.referenceNumber }}
    </slot>
  </a>
</template>