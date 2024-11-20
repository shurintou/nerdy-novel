<template>
  <div class="novel-card">
    <div class="cover">
      <img :src="novelData.imageUrl.length > 0 ? novelData.imageUrl : '/default-novel-cover.jpg'"
        :alt="novelData.imageAlt.length > 0 ? novelData.imageAlt : 'Novel Cover'">
    </div>

    <div class="metadata">
      <div class="novel-title">{{ novelData.title }}</div>

      <div class="novel-category-author">
        <BaseTag v-for="category in novelData.categories" :key="category" :text="category" /> |
        作者: {{ novelData.author }}
      </div>

      <div class="novel-chapter-update">
        <div class="latest-chapter"> 最新章节: {{ lastestChapter }}　</div>
        <div> 更新时间: {{ updatedDate }} </div>
      </div>

      <div class="novel-description">
        {{ novelData.description }}
      </div>

    </div>
  </div>
</template>

<script lang="ts" setup>

import type { Novel } from '@/types/apis/novels/'

const props = defineProps({
  novelData: {
    type: Object as PropType<Novel>,
    required: true
  }
})

const lastestChapter = computed(() => {
  const chapterLen = props.novelData.chapters.length
  const lastChapter = props.novelData.chapters[chapterLen - 1]
  return `第${chapterLen}章` + (lastChapter.title.length > 0 ? ': ' + lastChapter.title : '')
})

const updatedDate = computed(() => {
  const { updatedAt } = props.novelData
  const isNumeric = /^\d+$/.test(updatedAt)
  const length = updatedAt.length
  const isValidLength = length === 10 || length === 13
  // whether updatedAt is a timestamp
  if (isNumeric && isValidLength) {
    const date = new Date(parseInt(updatedAt))
    return `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`
  }
  return updatedAt
})
</script>

<style lang="css" scoped>
.novel-card {
  display: flex;
  background-color: var(--novel-background-color-light);
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  max-width: 1200px;
  margin: 0px auto;
  padding: 10px;
}

.novel-card .cover {
  min-width: 15%;
  background-color: var(--novel-background-color-light);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
}

.novel-card .cover img {
  border-radius: 10px;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  width: 120px;
  height: auto;
  object-fit: contain;
}

.novel-card .cover img:hover {
  transform: scale(1.1);
}

.novel-card .metadata {
  padding: 10px;
  width: 65%;
  max-width: 85%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.novel-title {
  font-size: 1.6rem;
  font-weight: bold;
  margin-bottom: 10px;
}

.novel-category-author {
  color: #666;
  margin-bottom: 10px;
  font-size: 0.9rem;
}

.novel-chapter-update {
  display: flex;
  flex-wrap: wrap;
  color: #888;
  font-size: 0.9rem;
}

.novel-chapter-update :last-child {
  margin-bottom: 10px
}

.latest-chapter {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.5;
  max-height: 3.0rem;
}

.novel-description {
  color: var(--text-color-light);
  margin-bottom: 10px;
  font-size: 0.9rem;
  line-height: 1.5;
}

.novel-stats {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  color: #444;
}

.novel-stats span {
  font-weight: bold;
}

#app-container.dark-mode .novel-card {
  background-color: var(--novel-background-color-dark);
}

#app-container.dark-mode .novel-card .cover {
  background-color: var(--novel-background-color-dark);
}

#app-container.dark-mode .novel-card .novel-description {
  color: var(--text-color-dark);
}
</style>