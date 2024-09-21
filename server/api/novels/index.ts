import { H3Event, EventHandlerRequest } from 'h3'
import { CategoryNovelsData, CategoryNovelsParams } from '@/types/apis/novels/'
import { getNovelList } from "~/server/utils/novel_list"

const sizePerPage = 30

export default defineEventHandler(async (event: H3Event<EventHandlerRequest>): Promise<CategoryNovelsData> => {
    const {category, page} = getQuery(event) as CategoryNovelsParams
    const genre = category?.split(',') || [] // genre is the backend model name
    const {novels, total} = await getNovelList(genre)

    return {
        category: genre,
        page: page || 1,
        totalPages: Math.ceil(total / sizePerPage),
        total,
        novels,
    }
})
