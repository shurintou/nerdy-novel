<template>
  <div class="filter">
    <NovelFilterCategoryItem :isTop="true" :categoryList="topCategoryItemList" :title="'热门分类'"
      :queryKey="CATEGORY_QUERY_KEY" />
    <NovelFilterCategoryItem :isTop="false" :categoryList="otherCategoryItemTagList" :title="'其他分类'"
      :queryKey="CATEGORY_QUERY_KEY" :isExpanded="isFilterExpanded" />

    <button class="toggle-btn" :class="{ 'expanded': isFilterExpanded }" @click="toggleFilterExpandHandler">
      {{
        (isFilterExpanded ? '▲收起' : '▼展开') + (selectedCategory.length > 0 ? ` 已选择${selectedCategory.length}个分类` : '')
      }}
    </button>
  </div>
</template>

<script lang="ts" setup>
const CATEGORY_QUERY_KEY = 'category'
const { selectedCategory } = useNovelFilter()

defineProps({
  isStatic: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
})

const { data, error } = await useCacheFetch<Array<string>>('/api/novels/categories')
if (error.value) { throw createError(error.value as any) }
const categories = ref(data.value)

const topCategoryItemList = computed(() => categories.value.slice(0, 10))
const otherCategoryItemTagList = computed(() => categories.value.length > 10 ? categories.value.slice(10) : [])
const hasOtherCategorySelected = computed(() => selectedCategory.value.some(category => otherCategoryItemTagList.value.includes(category)))

const isFilterExpanded = ref(hasOtherCategorySelected.value)

const toggleFilterExpandHandler = function () {
  isFilterExpanded.value = !isFilterExpanded.value
}
</script>

<style lang="css" scoped>
.filter {
  background-color: var(--filter-background-color-light);
  border: 1px solid var(--filter-background-color-light);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  margin: 0 auto;
  width: 100%;
}

#app-container.dark-mode .filter {
  background-color: var(--filter-background-color-dark);
  border: 1px solid var(--filter-background-color-dark);
}

.toggle-btn {
  display: block;
  width: 100%;
  background: #88d3ce;
  color: #fff;
  padding: 4px;
  margin-top: 5px;
  border: none;
  cursor: pointer;
  text-align: center;
  font-size: 0.875rem;
}

@media (min-width: 1025px) {
  .toggle-btn {
    background: linear-gradient(to right,
        rgba(136, 211, 206, 0.6) 0%,
        rgba(136, 211, 206, 1) 50%,
        rgba(136, 211, 206, 0.6) 100%);
  }

  #app-container.dark-mode .toggle-btn {
    background: linear-gradient(to right,
        rgba(107, 156, 140, 0.2) 0%,
        rgba(107, 156, 140, 0.6) 50%,
        rgba(107, 156, 140, 0.2) 100%);
  }
}

#app-container.dark-mode .toggle-btn.expanded {
  background-color: #adbeba;
}

#app-container.dark-mode .toggle-btn {
  background-color: #6b9c8c;
}

.toggle-btn.expanded {
  background-color: rgba(136, 211, 206, 0.4);
}

@media (hover: hover) and (pointer: fine) {
  .toggle-btn:hover {
    background-color: rgba(94, 166, 160, 0.8);
    color: rgba(255, 255, 255, 1);
  }

  #app-container.dark-mode .toggle-btn:hover {
    background-color: rgba(54, 124, 119, 0.8);
  }
}
</style>