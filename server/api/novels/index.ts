import { NovelBasicMetaData } from '@/types/apis/novels/'

export default defineEventHandler(async (): Promise<Array<NovelBasicMetaData>> => {
  const novels: Array<NovelBasicMetaData> = []
  for (let i = 1; i <= 100; i++) {
    const isEven = i % 2 === 0
    novels.push({
      id: `${i}`,
      author: isEven ? '王二狗' : '张狗蛋',
      category: isEven ? '都市' : '言情',
      title: isEven ? '重生神拳' : '网络神豪',
      updatedAt: '2024/09/12',
    })
  }
  return novels
})

