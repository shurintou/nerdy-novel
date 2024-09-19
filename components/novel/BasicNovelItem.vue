<template>
  <div class="basic-novel-list-item" @click="clickHandler(novelData.id)">
    <div class="novel-title">
      <BaseTag v-for="category in novelData.categories" :text="category" />
      {{ novelData.title }}
    </div>
    <div class="novel-author">{{ novelData.author }}</div>
    <div class="novel-updated">{{ novelData.updatedAt }}</div>
  </div>
</template>

<script lang="ts" setup>
import type { NovelBasicMetaData } from '@/types/apis/novels/'

defineProps({
  novelData: {
    type: Object as PropType<NovelBasicMetaData>,
    required: true
  }
})

const clickHandler = (novelId: string) => {
  window.location.href = `/novels/${novelId}`
}
</script>

<style lang="css" scoped>
.basic-novel-list-item {
  background-color: var(--novel-background-color-light);
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 8px;
  position: relative;
  display: flex;
  flex-direction: column;
  height: 60px;
  margin: 4px;
  cursor: pointer;
}

.basic-novel-list-item:hover {
  background-color: #f0f0f0;
}


.basic-novel-list-item:last-child {
  margin-bottom: 16px;
}

.novel-title {
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 0.975rem;
  font-weight: bold;
  color: var(--text-color-light);
}

.novel-author {
  position: absolute;
  bottom: 10px;
  left: 10px;
  font-size: 0.775rem;
  color: #666;
}

.novel-updated {
  position: absolute;
  bottom: 10px;
  right: 10px;
  font-size: 0.775rem;
  color: #999;
}

#app-container.dark-mode .basic-novel-list-item {
  background-color: var(--novel-background-color-dark);
}

#app-container.dark-mode .basic-novel-list-item:hover {
  background-color: #3a3a3a;
}

#app-container.dark-mode .novel-title {
  color: var(--text-color-dark);
}
</style>