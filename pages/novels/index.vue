<template>
  <section class="novel-list-page">
    <h2>所有小说分类</h2>
    <div class="categories">
      <ul>
        <li v-for="category in categories" :key="category" @click="selectCategory(category)">
          <div class="tag" :class="{ 'highlight': selectedCategory?.includes(category) }">{{ category }}</div>
        </li>
      </ul>
    </div>

    <div v-if="selectedCategory">
      <h2>小说列表</h2>
      <div class="novel-list">
        <div v-for="novel in novels" :key="novel.id" class="novel-item">
          <a :href="`/novels/${novel.id}`">{{ novel.title }}</a>
        </div>
      </div>

      <pagination :total="totalPages" :current="currentPage" @page-changed="fetchNovels" />
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { NovelBasicMetaData, CategoryNovelsData } from '@/types/apis/novels/'
import Pagination from '@/components/base/Pagination.vue'

const currentPage = ref(1)
const totalPages = ref(0)
const selectedCategory = ref<Array<string>>([])
const novels = ref<Array<NovelBasicMetaData>>([])

const { data: categories } = await useCacheFetch<Array<string>>(`/api/novels/categories`)

const route = useRoute()
const page = Array.isArray(route.query.page)
  ? parseInt(route.query.page[0] || '1', 10)
  : parseInt(route.query.page || '1', 10)
const categoriesInQuery = route.query.category as string | string[]
selectedCategory.value = Array.isArray(categoriesInQuery)
  ? categoriesInQuery : [categoriesInQuery]
const searchQuery = new URLSearchParams(route.query as Record<string, string>).toString()
const { data } = await useCacheFetch<CategoryNovelsData>(`/api/novels?${searchQuery}`)
novels.value = data.value?.novels || []
totalPages.value = data.value?.totalPages || 0
currentPage.value = page

const fetchNovels = async (page = 1) => {
  const currentUrl = window.location.href
  const newUrl = new URL(currentUrl)
  newUrl.searchParams.set('page', page.toString())
  newUrl.searchParams.delete('category')
  selectedCategory.value.forEach(category => { if (category) newUrl.searchParams.append('category', category as string) })
  window.location.href = newUrl.toString()
}

const selectCategory = (category: string) => {
  const index = selectedCategory.value.findIndex((item: string) => item === category)
  if (index > -1) {
    selectedCategory.value.splice(index, 1)
  } else {
    selectedCategory.value.push(category)
  }
  fetchNovels()
}

useHead({
  title: '全部作品 - 呆书网'
})

</script>

<style lang="css" scoped>
.novel-list-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px 20px;
}

.tag {
  display: inline-block;
  background-color: #e0e0e0;
  color: #333;
  border-radius: 12px;
  padding: 4px 8px;
  font-size: 0.75rem;
  font-weight: bold;
  margin-right: 5px;
  white-space: nowrap;
}

.tag:hover {
  background-color: #ddd;
  cursor: pointer;
}

.highlight {
  background-color: #ff6f61;
  border-color: #ff6f61;
  color: white;
}
</style>