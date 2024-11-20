<template>
  <BaseBreadCrumb />
  <div class="novel-container">
    <BaseUnderline :level="2">第{{ chapterOrder }}章</BaseUnderline>
    <div class="novel-content" v-html="novelChapterContent">
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
const { data, error } = await useCacheFetch<Novel>(`/api/novels/${novelId}/chapters/${chapterOrder}`)
if (error.value) { throw createError(error.value as any) }
const novelData = ref(data.value)

updateNovelTitle(novelData.value.title)

const novelChapterContent = computed(() => {
  const pureContent = novelData.value.chapters[chapterOrder - 1].content
  // split the content text into paragraphs and wrap each with <p> to apply `text-indent` CSS.
  const paragraphedContent = pureContent.split('\n').map(paragraph => `<p>${paragraph}</p>`).join('')
  return paragraphedContent
})

function fetchChapter(page = 1) {
  const currentUrl = window.location.href
  const newUrl = currentUrl.replace(/(chapters\/)\d+/, `$1${page}`)
  window.location.href = newUrl
}

const title = computed(() => novelData.value?.title ? `${novelData.value.title} 第${chapterOrder}章 - 呆说网` : '呆说网')

const bookReleaseDate = computed(() => {
  const date = new Date(parseInt(novelData.value?.createdAt) || 0)
  return date.toISOString()
})

useHead({
  title: title
})

useNerdySeoMeta({
  title,
  ogDescription: novelData.value.description,
  twitterDescription: novelData.value.description,
  ogType: 'book',
  bookAuthor: [novelData.value.author],
  bookTag: novelData.value.categories,
  bookReleaseDate,
})
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
  text-indent: 2rem;
  margin-bottom: 1.5rem;
  line-height: 1.6;
  background-color: var(--chapter-background-color-light);
  word-break: break-all;
  white-space: normal;
}
</style>
