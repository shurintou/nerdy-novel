<template>
  <div class="category-list">
    <CategoryItem v-for="item in categoryNovels" :key="item.id" :data="item" />
  </div>

</template>

<script lang="ts" setup>
import type { CategoryNovels } from '@/types/apis/home/'

const props = defineProps({
  apiPath: {
    type: String,
    required: true
  }
})
const { data: categoryNovels, error } = await useCacheFetch<CategoryNovels[]>(props.apiPath)
if (error.value) {
  console.error('Error fetching novels:', error.value)
}
</script>

<style lang="css" scoped>
.popular-categories {
  margin: 20px 0;
}

.category-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}
</style>