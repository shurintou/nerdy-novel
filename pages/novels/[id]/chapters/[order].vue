<template>
  <BaseBreadCrumb />
  <div class="novel-container">
    <BaseUnderline :level="2">第{{ chapterOrder }}章</BaseUnderline>
    <div class="novel-content" v-html="novelData.chapters[chapterOrder - 1].content">
    </div>
  </div>
  <BasePagination :total="novelData.chapters.length" :current="chapterOrder" :unit="'章'" :show-both-end="false"
    @page-changed="fetchChapter" />
</template>

<script lang="ts" setup>
import type { Novel } from '@/types/apis/novels/'
const { updateNovelTitle } = useBreadCrumb()
const route = useRoute()
const novelId = route.params.id || ''
const chapterOrder = parseInt(route.params.order as string) || 1
const { data: novelData } = await useCacheFetch<Novel>(`/api/novels/${novelId}/chapters/${chapterOrder}`)
updateNovelTitle(novelData.value.title)

function fetchChapter(page = 1) {
  const currentUrl = window.location.href
  const newUrl = currentUrl.replace(/(chapters\/)\d+/, `$1${page}`)
  window.location.href = newUrl
}
</script>

<style lang="css" scoped>
.novel-container {
  max-width: 1200px;
  margin: 10px auto 20px auto;
  padding: 10px 20px;
  background-color: var(--chapter-background-color-light);
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  line-height: 1.8;
  color: var(--text-color-light);
  word-wrap: break-all;
  overflow-wrap: break-word;
}

#app-container.dark-mode .novel-content,
#app-container.dark-mode .novel-container {
  color: var(--text-color-dark);
  background-color: var(--chapter-background-color-dark);
}

.novel-content {
  text-indent: 2em;
  margin-bottom: 1.5em;
  line-height: 1.6;
  background-color: var(--chapter-background-color-light);
  word-break: break-all;
  white-space: normal;
}
</style>