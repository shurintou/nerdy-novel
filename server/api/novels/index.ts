import { H3Event, EventHandlerRequest } from 'h3'
import { CategoryNovelsData, CategoryNovelsParams } from '@/types/apis/novels/'
import { categoriesMaster } from './categories'
import {getNovelList} from "~/server/utils/novel_list";

const sizePerPage = 30

export default defineEventHandler(async (event: H3Event<EventHandlerRequest>): Promise<CategoryNovelsData> => {
  const {novels, total} = await getNovelList()
  const { category, page } = getQuery(event) as CategoryNovelsParams
  const correctPage = page || 1
  const outputCategories = category ? category.split(',') : [categoriesMaster[0]]

  return {
    category: outputCategories,
    page: correctPage,
    totalPages: total/sizePerPage,
    total,
    novels,
  }
})
