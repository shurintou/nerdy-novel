import { CategoryNovels, NovelBasicMetaData } from '@/types/apis/home/'

export default defineEventHandler(async (): Promise<Array<CategoryNovels>> => {
  const categories: Array<string> = ['玄幻修仙', '都市生活', '爱情故事', '科幻悬疑', '游戏体育', '恐怖惊悚', '武侠仙侠', '穿越魂穿']
  const categoryNovelsList: Array<CategoryNovels> = []
  for (let i = 1; i <= 8; i++) {
    const categoryNovelBasicMetaDataList: Array<NovelBasicMetaData> = []
    for (let j = 1; j <= 8; j++) {
      const fooFlag = Math.random() < 0.5
      const category = fooFlag ? categories[i - 1].substring(0, 2) : categories[i - 1].slice(-2)
      categoryNovelBasicMetaDataList.push({
        id: `${i}${j}`,
        title: `${category}小说${j}`,
        category: category
      })
    }
    categoryNovelsList.push({
      id: `${i}`,
      categoryTitle: categories[i - 1],
      novelBasicMetaDataList: categoryNovelBasicMetaDataList
    })
  }
  return categoryNovelsList
})

