<template>
  <span class="novel-category">{{ text }}</span>
</template>

<script lang="ts" setup>
defineProps({
  text: {
    default: '待分类'
  }
})
</script>

<style lang="css" scoped>
.novel-category {
  display: inline-block;
  background-color: #e0e0e0;
  color: #333;
  border-radius: 12px;
  padding: 4px 6px;
  font-size: 0.65rem;
  font-weight: bold;
  margin-right: 2px;
  white-space: nowrap;
}
</style>