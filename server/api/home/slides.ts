import { Slide } from '@/types/slide'

export default defineEventHandler(async (): Promise<Array<Slide>> => {
  const slides: Array<Slide> = [
    {
      id: 1,
      url: "https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/cf9e9f36b7a5ac305f0b3f8badda5509.jpg",
      alt: "Slide 1"
    }, {
      id: 2,
      url: "https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/24dad372e313be5cdfacfdc2cbb5d9f7.jpg",
      alt: "Slide 2"
    }, {
      id: 3,
      url: "https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/2878f590533b8c13ad1cab3b79387817.jpg",
      alt: "Slide 3"
    }
  ]
  return slides
})

