<template>
  <div>
    <h1>{{ novel?.title }}</h1>
    <div v-html="novel?.content"></div>

    <div v-if="comments">
      <h2>评论</h2>
      <ul>
        <li v-for="comment in comments" :key="comment.id">
          <p v-html="comment.userName + '说：' + comment.text"></p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Novel } from '@/types/novel'
import type { Comment } from '@/types/comment'

const route = useRoute()
const novelId = route.params.id
const { data: novel } = await useFetch<Novel>(`/api/novels/${novelId}`)

const title = computed(() => novel.value?.title ? `${novel.value.title} - 我的小说网站` : '我的小说网站')
const comments = ref<Comment[]>([])

useHead({
  title: title
})

onMounted(async () => {
  try {
    const commentsResponse = await fetch(`/api/novels/${novelId}/comments`)
    if (!commentsResponse.ok) throw new Error('Failed to fetch comments data')
    const commentsData = await commentsResponse.json()
    comments.value = commentsData
  } catch (error) {
    console.error(error)
  }
})

</script>
