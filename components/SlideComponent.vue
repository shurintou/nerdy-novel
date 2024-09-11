<template>
  <Swiper :modules="[SwiperAutoplay, SwiperEffectCreative, SwiperPagination]" :slides-per-view="1" :loop="true"
    :effect="'creative'" :autoplay="{
      delay: 8000,
      disableOnInteraction: false,
    }" :creative-effect="{
      prev: {
        shadow: false,
        translate: ['-20%', 0, -1],
      },
      next: {
        translate: ['100%', 0, 0],
      },
    }" :pagination="{
      el: '.swiper-pagination',
    }">
    <SwiperSlide v-for="slide in slides" :key="slide.id">
      <img :src="slide.url" :alt="slide.alt" />
    </SwiperSlide>
    <div class="swiper-pagination"></div>
  </Swiper>
</template>

<script setup lang="ts">
import type { Slide } from '@/types/apis/slide'

const props = defineProps({
  apiPath: {
    type: String,
    required: true
  }
})

const slides = ref<Array<Slide>>([])

onMounted(async () => {
  const response = await fetch(props.apiPath)
  slides.value = await response.json()
})
</script>

<style scoped>
.swiper {
  position: relative;
  /* keep the dom resize with the size of the image */
  aspect-ratio: 1080 / 375;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.swiper-slide img {
  width: 1200px;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  display: block;
  margin: auto;
}

.swiper-pagination {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
