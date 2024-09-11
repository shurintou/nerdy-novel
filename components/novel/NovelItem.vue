<template>
  <div class="novel">
    <img :src="novelData.imageUrl" :alt="novelData.imageAlt" class="novel-thumbnail">
    <div class="novel-info">
      <div>
        <a :href="`/novels/${novelData.id}`">
          <h5>{{ novelData.title }}</h5>
          <div class="novel-description">
            {{ novelData.description }}
          </div>
        </a>
      </div>
      <div class="novel-meta">
        <p>
          <BaseTag :text="novelData.category" />
        </p>
        <p><span class="novel-author">{{ novelData.author }}</span></p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { NovelMetaData } from '@/types/apis/novels/'

defineProps({
  novelData: {
    type: Object as PropType<NovelMetaData>,
    required: true
  }
})
</script>

<style lang="css">
.novel {
  display: flex;
  flex-direction: row;
  background-color: var(--novel-background-color-light);
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s;
  position: relative;
  align-items: flex-start;
}

.novel img.novel-thumbnail {
  width: 120px;
  height: auto;
  object-fit: contain;
  border-radius: 5px;
  margin-right: 20px;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.novel img.novel-thumbnail:hover {
  transform: scale(1.1);
}

.novel-info {
  display: flex;
  min-height: 20vh;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
  position: relative;
}

.novel-meta {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}

.novel-meta p {
  margin: 0;
  font-size: 0.85rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.novel h5 {
  margin: 0 0 2px;
  font-size: 1.1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.novel-description {
  margin: 2px 0;
  font-size: 0.9rem;
  display: -webkit-box;
  line-clamp: 4;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.novel-description :hover {
  cursor: pointer;
}

.novel-author {
  font-size: 0.75rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #999;
  font-weight: normal;
}

@media (max-width: 768px) {
  .novel h3 {
    font-size: 1rem;
  }

  .novel p {
    font-size: 0.85rem;
  }

  .novel-author {
    font-size: 0.7rem;
    color: #999;
    font-weight: normal;
  }
}

.novel a {
  text-decoration: none;
  color: inherit;
}

.novel a:focus {
  transition: color 0.3s ease;
  color: var(--primary-button-color);
}

.novel a h5:hover {
  transition: color 0.3s ease;
  color: var(--primary-button-color);
}
</style>