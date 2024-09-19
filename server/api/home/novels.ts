import { NovelMetaData } from '@/types/apis/home/'
import {getNovelList} from "~/server/utils/novel_list";

export default defineEventHandler(async (): Promise<Array<NovelMetaData>> => {
  const {novels} = await getNovelList()
  return novels
})
