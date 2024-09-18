<template>
  <div class="category">
    <BaseUnderline :level="5" style="padding-bottom: 5px;margin: 0;">
      {{ data.categoryTitle }}
    </BaseUnderline>
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

.category a {
  display: block;
  text-decoration: none;
  color: inherit;
  margin: 5px 0;
}

.category a:hover {
  color: var(--primary-button-color);
}

@media (max-width: 768px) {
  .category-list {
    grid-template-columns: 1fr;
  }
}

#app-container.dark-mode .category {
  background: var(--novel-background-color-dark);
}
</style>