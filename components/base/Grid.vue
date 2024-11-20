<template>
  <div :style="gridStyle" class="grid-container">
    <slot />
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  minContent: {
    type: String,
    default: '250px',
  },
  maxContent: {
    type: String,
    default: '1fr',
  },
  gap: {
    type: String,
    default: '16px',
  },
})

const gridStyle = computed(() => {
  return {
    display: 'grid',
    gap: `${props.gap}`,
    'grid-template-columns': ` repeat(auto-fill, minmax(${props.minContent}, ${props.maxContent}))`
  }
})
</script>
