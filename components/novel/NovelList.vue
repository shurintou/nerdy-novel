<template>
  <div class="novel-list">
    <NovelItem v-for="novel in novels" :key="novel.id" :novelData="novel" />
  </div>
</template>

<script lang="ts" setup>
import type { Novel } from '@/types/novel'

const props = defineProps({
  apiPath: {
    type: String,
    required: true
  }
})

const { data: novels, error } = await useFetch<Novel[]>(props.apiPath)
if (error.value) {
  console.error('Error fetching novels:', error.value)
}
</script>

<style lang="css" scoped>
.novel-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}
</style>