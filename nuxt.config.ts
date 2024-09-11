import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  ssr: true,
  modules: ['nuxt-swiper'],
  css: [
    '~/assets/css/global.css',
  ],
  app: {
    head: {
      htmlAttrs: {
        lang: 'zh',
      },
      meta: [
        { charset: 'UTF-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      ],
      title: 'Nerdy Novel',
      link: [
        { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css' },
      ],
    }
  }
})
