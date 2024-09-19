<template>
  <div>
    <h1>{{ novel?.title }}</h1>

  </div>
</template>

<script setup lang="ts">
import type { Novel, } from '@/types/apis/novels/'

const route = useRoute()
const novelId = route.params.id
const { data: novel } = await useCacheFetch<Novel>(`/api/novels/${novelId}`)

const title = computed(() => novel.value?.title ? `${novel.value.title} - 呆说网` : '呆说网')

useHead({
  title: title
})

</script>
