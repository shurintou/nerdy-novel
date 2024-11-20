<template>
  <div class="basic-novel-list-item" @click="clickHandler(novelData.id)">
    <img class="cover-image" :src="novelData.imageUrl" :alt="novelData.imageAlt" />
    <div class="meta-info">
      <div class="meta-top">
        <h3 class="novel-title">{{ novelData.title }}</h3>
        <div class="category-tag">
          <BaseTag v-for="category in novelData.categories" :text="category" />
        </div>
      </div>
      <p class="novel-description">
        {{ novelData.description }}
      </p>
      <div class="meta-bottom">
        <span class="author">{{ novelData.author }}</span>
        <div class="meta-bottom">
          <span class="update-date">更新于：{{ formattedDate }}</span>
          <span class="global-divider"></span>
          <span class="update-date">{{ novelData.length }}字</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { NovelMetaData } from '@/types/apis/novels/'

const props = defineProps({
  novelData: {
    type: Object as PropType<NovelMetaData>,
    required: true
  }
})

const clickHandler = (novelId: string) => {
  window.location.href = `/novels/${novelId}`
}

const formattedDate = computed(() => {
  const updatedDate = new Date(parseInt(props.novelData.updatedAt))
  return `${updatedDate.getFullYear()}/${updatedDate.getMonth()}/${updatedDate.getDate()}`
})
</script>

<style lang="css" scoped>
.cover-image {
  width: 120px;
  height: auto;
  object-fit: contain;
  border-radius: 5px;
  margin-right: 20px;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.cover-image:hover {
  transform: scale(1.1);
}

.meta-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.meta-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.novel-title {
  font-size: 1.25rem;
  color: var(--text-color-light);
  font-weight: bold;
  margin: 0;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  overflow: hidden;
}

.category-tag {
  padding: 0.25rem 0.5rem;
}

.novel-description {
  margin: 0.5rem 0;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  overflow: hidden;
}

.meta-bottom {
  display: flex;
  justify-content: space-between;
  margin-top: auto;
  align-items: center;
}

.author,
.update-date {
  font-size: 0.775rem;
  color: #999;
}

.update-date {
  padding: 0rem 0.5rem;
}

@media (max-width: 768px) {
  .cover-image {
    margin-right: 0.675rem;
  }

  .category-tag {
    padding: 0.1rem 0rem;
  }

  .novel-description {
    margin: 0.1rem 0;
  }

  .update-date {
    padding: 0;
  }

  .novel-title {
    font-size: 1rem;
  }

  .meta-top {
    flex-direction: column;
    align-items: flex-start;
  }
}

.basic-novel-list-item {
  background-color: var(--novel-background-color-light);
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 8px;
  position: relative;
  display: flex;
  margin: 6px 2px;
  cursor: pointer;
}

.basic-novel-list-item:hover {
  background-color: #f0f0f0;
}

.global-divider {
  opacity: 0.8;
  display: inline-block;
  width: 1px;
  height: 0.8rem;
  border-right-color: #999;
  border-right-style: solid;
  border-right-width: 1px;
}

.basic-novel-list-item:last-child {
  margin-bottom: 16px;
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
