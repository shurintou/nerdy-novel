import { H3EventContext } from 'h3'
import { Comment } from '@/types/comment'

export default defineEventHandler(async (event: H3EventContext) => {
  const { id } = event.context.params as { id: string }

  const comments: Array<Comment> = []

  for (let i = 1; i <= 10; i++) {
    comments.push({ id: `${i}`, userName: `路人${i}`, text: `<p>小说${id}写的不错</p>` })
  }

  return comments
})
