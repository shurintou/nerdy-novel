<template>
  <div class="category">
    <h5 class="underline">{{ data.categoryTitle }}</h5>
    <a v-for="novelBasicMetaData in data.novelBasicMetaDataList" :href="`/novels/${novelBasicMetaData.id}`">
      <BaseTag :text="novelBasicMetaData.category" />
      {{ novelBasicMetaData.title }}
    </a>
  </div>
</template>


<script lang="ts" setup>
import type { CategoryNovels } from '@/types/apis/home/'
defineProps({
  data: {
    type: Object as PropType<CategoryNovels>,
    required: true
  }
})
</script>

<style lang="css" scoped>
.category {
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.category h5.underline {
  position: relative;
  margin: 0;
  padding-bottom: 5px;
  border-bottom: 1px solid #000;
}

.category h5.underline::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 1px;
  background-color: var(--text-color-light);
}

.category a {
  display: block;
  text-decoration: none;
  color: inherit;
  margin: 5px 0;
}

.category a:hover {
  transition: color 0.3s ease;
  color: var(--primary-button-color);
}

@media (max-width: 768px) {
  .category-list {
    grid-template-columns: 1fr;
  }
}

body.dark-mode .underline::after {
  background-color: var(--text-color-dark);
}

body.dark-mode .category {
  background: var(--novel-background-color-dark);
}
</style>