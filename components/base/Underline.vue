<template>
  <component :is="headingTag" class="underline">
    <slot />
  </component>
</template>

<script lang="ts" setup>
const props = defineProps({
  level: {
    type: Number,
    default: 1,
  },
})

const headingTag = computed(() => `h${props.level}`) 
</script>

<style lang="css" scoped>
.underline {
  position: relative;
  padding-bottom: 10px;
  border-bottom: 1px solid #333;
}

.underline::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 1px;
  background-color: var(--text-color-light);
}

#app-container.dark-mode .underline::after {
  background-color: var(--text-color-dark);
}
</style>