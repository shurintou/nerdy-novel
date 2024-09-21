<template>
  <div class="basic-novel-list-item drop-shadow-md rounded flex mb-2 p-3" @click="clickHandler(novelData.id)">
    <img class="novel-thumbnail mr-3 rounded" :src="novelData.imageUrl" :alt="novelData.imageAlt" >

    <div class="flex-auto flex flex-col justify-between">
      <div class="flex">
        <div class="text-xl font-bold cursor-pointer underline">
          {{ novelData.title }}
        </div>

        <div class="flex-auto">
          <div class="float-end">
            <BaseTag v-for="category in novelData.categories" :text="category" />
          </div>
        </div>
      </div>

      <div class="text-sm text-gray-600">
        {{ novelData.description }}
      </div>

      <div class="flex">
        <div class="text-xs text-cyan-800 italic">{{ novelData.author }}</div>

        <div class="flex-auto">
          <div class="text-xs text-gray-400 italic float-end">更新于：{{ formattedDate }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { NovelBasicMetaData } from '@/types/apis/novels/'

const props = defineProps({
  novelData: {
    type: Object as PropType<NovelBasicMetaData>,
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
.novel-thumbnail {
  width: 100px;
}

.basic-novel-list-item {
  background-color: var(--novel-background-color-light);
}

.basic-novel-list-item:hover {
  background-color: #f0f0f0;
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
</style>
