<template>
  <section class="novel-list-page">
    <NovelFilter />

    <div v-if="selectedCategory" class="novel-list-wrapper">
      <BaseList class="novel-list">
        <BaseUnderline :level="3">小说列表</BaseUnderline>
        <BasicNovelItem v-for="novel in novels" :key="novel.id" :novel-data="novel" />
      </BaseList>
      <pagination :total="totalPages" :current="page" @page-changed="fetchNovels" />
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { NovelBasicMetaData, CategoryNovelsData } from '@/types/apis/novels/'
import Pagination from '@/components/base/Pagination.vue'
import BasicNovelItem from '~/components/novel/BasicNovelItem.vue';

const totalPages = ref(0)
const { page, selectedCategory, getNovelFilterSearchQuery, fetchNovels } = useNovelFilter()
const novels = ref<Array<NovelBasicMetaData>>([])

const { data } = await useCacheFetch<CategoryNovelsData>(`/api/novels?${getNovelFilterSearchQuery()}`)
novels.value = data.value?.novels || []
totalPages.value = data.value?.totalPages || 0

useHead({
  title: '全部作品 - 呆书网'
})

</script>

<style lang="css" scoped>
.novel-list-wrapper {
  max-width: 1200px;
  margin: 0 auto;
}

.novel-list {
  padding: 0px 15px
}
</style>