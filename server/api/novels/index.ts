import { H3Event, EventHandlerRequest } from 'h3'
import { CategoryNovelsData, CategoryNovelsParams, NovelBasicMetaData } from '@/types/apis/novels/'
import { categoriesMaster } from './categories'

const sizePerPage = 30

export default defineEventHandler(async (event: H3Event<EventHandlerRequest>): Promise<CategoryNovelsData> => {
  const { category, page } = getQuery(event) as CategoryNovelsParams
  const correctPage = page || 1
  const novels: Array<NovelBasicMetaData> = []
  const outputCategories = category.length > 0 ? category.split(',') : [categoriesMaster[0]]
  let outputCount = 0
  for (let i = 1; i <= sizePerPage; i++) {
    if (outputCount < sizePerPage) {
      const isEven = i % 2 === 0
      const index = (correctPage - 1) * sizePerPage + i
      novels.push({
        id: `${index}`,
        author: isEven ? '王二狗' : '张狗蛋',
        categories: outputCategories,
        title: `${outputCategories}小说${index}`,
        updatedAt: '2024/09/12',
      })
      outputCount++
    }
  }
  return {
    category: outputCategories,
    page: correctPage,
    totalPages: 10,
    total: 10 * sizePerPage,
    novels: novels
  }

})
