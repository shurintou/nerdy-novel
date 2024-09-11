import { NovelMetaData } from '@/types/apis/home/'

export default defineEventHandler(async (): Promise<Array<NovelMetaData>> => {
  const novels: Array<NovelMetaData> = []
  for (let i = 1; i <= 8; i++) {
    const isEven = i % 2 === 0
    novels.push({
      id: `${i}`,
      author: isEven ? '王二狗' : '张狗蛋',
      category: isEven ? '都市' : '言情',
      description: isEven ? '有人选择在猩红的夜晚，饮上一杯烈酒，举起了手里的猎枪。' : '身上留下了无数伤病的夏临终于混到一条WBA普通拳王金腰带,身上留下了无数伤病的夏临终于混到一条WBA普通拳王金腰带,身上留下了无数伤病的夏临终于混到一条WBA普通拳王金腰带',
      title: isEven ? '重生神拳' : '网络神豪',
      imageUrl: isEven ? 'https://bookcover.yuewen.com/qdbimg/349573/1035114945/90.webp' : 'https://bookcover.yuewen.com/qdbimg/349573/1028463573/90.webp',
      imageAlt: `Novel Thumbnail ${i}`,
      updatedAt: '2024/09/12',
    })
  }
  return novels
})

