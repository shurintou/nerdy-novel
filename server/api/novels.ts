import { Novel } from '@/types/novel'

export default defineEventHandler(async (): Promise<Array<Novel>> => {
  console.log(123)
  const novels: Array<Novel> = []
  for (let i = 1; i <= 100; i++) {
    novels.push({ "id": i, "title": `小说${i}`, "content": `<p>小说${i}的内容</p>` })
  }
  return novels
})

