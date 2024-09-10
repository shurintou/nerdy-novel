import { H3EventContext } from 'h3'
import { Novel } from '@/types/novel'

export default defineEventHandler((event: H3EventContext): Novel => {
  const { id } = event.context.params as { id: string }
  return { id: parseInt(id), "title": `小说${id}`, "content": `<p>小说${id}的内容</p>` }
})
