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

const handleClick = () => {
  window.open(targetUrl, '_blank', 'noopener')
}

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    handleClick()
  }
}
</script>

<template>
  <span
    role="link"
    tabindex="0"
    class="font-mono text-xs text-cyan-400/70 underline decoration-dotted cursor-pointer hover:text-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 rounded-sm"
    :aria-label="`Rule reference ${props.referenceNumber} - opens rulebook PDF`"
    @click="handleClick"
    @keydown="handleKeydown"
  >
    <slot>
      {{ props.referenceNumber }}
    </slot>
  </span>
</template>
