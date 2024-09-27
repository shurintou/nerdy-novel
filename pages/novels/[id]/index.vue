<template>
  <BaseBreadCrumb />
  <div class="novel-container">
    <NovelCard :novel-data="novel"></NovelCard>
  </div>
  <div class="chapter-container">
    <BaseUnderline :level="3">目录</BaseUnderline>
    <BaseGrid :min-content="'350px'" :gap="'8px'">
      <NovelChapter v-for="(chapter, index) in novel.chapters" :key="chapter.id" :chapter-number="index + 1"
        :chapter-data="chapter" />
    </BaseGrid>
  </div>
</template>

<script setup lang="ts">
import type { Novel, } from '@/types/apis/novels/'
const { updateNovelTitle } = useBreadCrumb()

const route = useRoute()
const novelId = route.params.id
const { data, error } = await useCacheFetch<Novel>(`/api/novels/${novelId}`)
if (error.value) { throw createError(error.value as any) }
const novel = ref(data.value)

updateNovelTitle(novel.value.title)

const title = computed(() => novel.value?.title ? `${novel.value.title} - 呆说网` : '呆说网')

useHead({
  title: title
})

</script>

<style lang="css" scoped>
.novel-container {
  margin: 20px 10px 10px 10px;
}

.chapter-container {
  max-width: 1200px;
  margin: 0px auto 20px auto;
  padding: 0px 10px;
}
</style>
