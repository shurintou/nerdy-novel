import { H3EventContext } from 'h3'
import { NovelWithCurrentChapterContent, Chapter } from '@/types/apis/novels/'

export default defineEventHandler((event: H3EventContext): NovelWithCurrentChapterContent => {
  const { id } = event.context.params as { id: string }
  const fooFlag = Math.random() < 0.5
  const chapters: Array<Chapter> = []
  for (let i = 1; i <= 10; i++) {
    chapters.push({
      id: `${i}`,
      title: '第${i}章',
      content: `<p>小说${id}的第${i}章内容</p>`,
      order: i,
      createdAt: '2024/01/01',
      updatedAt: '2024/09/12',
    })
  }
  return {
    id: `${id}`,
    author: fooFlag ? '王二狗' : '张狗蛋',
    category: fooFlag ? '都市' : '言情',
    description: fooFlag ? '有人选择在猩红的夜晚，饮上一杯烈酒，举起了手里的猎枪。' : '身上留下了无数伤病的夏临终于混到一条WBA普通拳王金腰带,身上留下了无数伤病的夏临终于混到一条WBA普通拳王金腰带,身上留下了无数伤病的夏临终于混到一条WBA普通拳王金腰带',
    title: fooFlag ? '重生神拳' : '网络神豪',
    chapters: chapters,
    currentChapterContent: `<p>你点选章节的小说${id}内容</p>`,
    imageUrl: fooFlag ? 'https://bookcover.yuewen.com/qdbimg/349573/1035114945/90.webp' : 'https://bookcover.yuewen.com/qdbimg/349573/1028463573/90.webp',
    imageAlt: `Novel Thumbnail ${id}`,
    createdAt: '2024/01/01',
    updatedAt: '2024/09/12'
  }
})
