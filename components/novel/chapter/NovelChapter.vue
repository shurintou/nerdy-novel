<template>
  <a :href="chapterLink" class="chapter-link">{{ chapterDisplayText }}</a>
</template>

<script lang="ts" setup>
import type { Chapter } from '@/types/apis/novels/index'
import type { PropType } from 'vue';

const props = defineProps({
  chapterData: {
    type: Object as PropType<Chapter>,
    required: true
  },
  chapterNumber: {
    type: Number,
    default: 1,
  }
})

const chapterLink = computed(() => `${useRoute().path}/chapters/${props.chapterNumber}`)
const chapterDisplayText = computed(() => '第' + props.chapterNumber + '章' + (props.chapterData.title.length > 0 ? ': ' + props.chapterData.title : '')) 
</script>

<style lang="css" scoped>
.chapter-link {
  padding: 10px 10px;
  margin: 0;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  background-color: var(--novel-background-color-light);
  border-radius: 8px;
  text-decoration: none;
  color: var(--text-color-light);
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.5;
  max-height: 1.5rem;
}

#app-container.dark-mode .chapter-link {
  background-color: var(--chapter-background-color-dark);
  color: var(--text-color-dark);
}

.chapter-link:hover {
  background-color: #e0e0e0;
}

#app-container.dark-mode .chapter-link:hover {
  background-color: #c2bebe;
}
</style>