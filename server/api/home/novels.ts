import { NovelMetaData } from '@/types/apis/home/'
import {getNovelList} from "~/server/utils/novel";

export default defineEventHandler(async (): Promise<Array<NovelMetaData>> => {
  const {novels} = await getNovelList([])
  return novels
})
