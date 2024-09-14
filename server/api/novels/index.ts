import { NovelBasicMetaData } from '@/types/apis/novels/'
import {getNovelList} from "~/server/utils/novel_list";

export default defineEventHandler(async (): Promise<Array<NovelBasicMetaData>> => {
  return await getNovelList()
})
