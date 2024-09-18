<template>
  <section class="hero">
    <SlideComponent :apiPath="slideAPI" />
  </section>

  <div class="main-content">
    <section class="latest-novels">
      <h2 class="underline">最新小说</h2>
      <BaseGrid>
        <NovelItem v-for="item in novels" :key="item.id" :novelData="item" />
      </BaseGrid>
    </section>

    <section class="popular-categories">
      <h2>热门分类</h2>
      <BaseGrid>
        <CategoryItem v-for="item in categoryNovels" :key="item.id" :data="item" />
      </BaseGrid>
    </section>
  </div>
</template>

<script lang="ts" setup>
import type { NovelMetaData } from '@/types/apis/novels/'
import type { CategoryNovels } from '@/types/apis/home/'

const slideAPI = '/api/home/slides'
const novelsAPI = '/api/home/novels'
const categoriesAPI = '/api/home/categories'

const { data: novels } = await useCacheFetch<Array<NovelMetaData>>(novelsAPI)
const { data: categoryNovels } = await useCacheFetch<CategoryNovels[]>(categoriesAPI)

useHead({
  title: '主页 - 呆书网'
})
</script>

<style lang="css" scoped>
.hero {
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px 0px 0px 0px;
}

.main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px 20px;
}

.latest-novels .underline {
  position: relative;
  padding-bottom: 10px;
}

.latest-novels .underline::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 1px;
  background-color: var(--text-color-light);
}

#app-container.dark-mode .latest-novels .underline::after {
  background-color: var(--text-color-dark);
}
</style>
