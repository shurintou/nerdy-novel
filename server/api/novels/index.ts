import { H3Event, EventHandlerRequest } from 'h3'
import { CategoryNovelsData, CategoryNovelsParams } from '@/types/apis/novels/'
import { getNovelList } from "~/server/utils/novel_list"

const sizePerPage = 30

export default defineEventHandler(async (event: H3Event<EventHandlerRequest>): Promise<CategoryNovelsData> => {
    const {novels, total} = await getNovelList()
    const {category, page} = getQuery(event) as CategoryNovelsParams

    return {
        category: category?.split(',') || "none",
        page: page || 1,
        totalPages: Math.ceil(total / sizePerPage),
        total,
        novels,
    }
})
