<template>
  <div>
    <h1>小说列表</h1>
    <ul v-if="novels">
      <li v-for="novel in novels" :key="novel.id">
        <a :href="`/novels/${novel.id}`">{{ novel.title }}</a>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { NovelMetaData } from '@/types/apis/novels/'

const { data: novels, error } = await useFetch<NovelMetaData[]>('/api/novels')
if (error.value) {
  console.error('Error fetching novels:', error.value)
}
useHead({
  title: '全部作品 - 呆书网'
})
</script>
