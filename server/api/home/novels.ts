import { NovelMetaData } from '@/types/apis/home/'
import getDBClient from "~/server/utils/db";
import {ScanCommand} from "@aws-sdk/client-dynamodb";

export default defineEventHandler(async (): Promise<Array<NovelMetaData>> => {
  try {
    const client = await getDBClient()
    // TODO: Count can be used for pagination
    const {$metadata: {httpStatusCode}, Count, Items} = await client.send(new ScanCommand({
      TableName: "nerdy-novel"
    }))

    // TODO: handle the 4XX/5XX error case
    if (httpStatusCode !== 200) {
      return httpStatusCode
    }

    const novels: Array<NovelMetaData> = []
    for (let item of Items) {
      const {
        id: {S: id},
        author_id: {N: author_id},
        genre: {SS: genre},
        synopsis: {S: synopsis},
        title: {S: title},
        updated_at: {N: updated_at},
      } = item
      novels.push({
        id,
        author: author_id,
        category: genre[0], // TODO: genre is a list
        description: synopsis,
        title,
        imageUrl: 'https://bookcover.yuewen.com/qdbimg/349573/1035114945/90.webp',
        imageAlt: `Novel Thumbnail ${id}`,
        updatedAt: new Date(updated_at).toDateString(),
      })
    }
    return novels
  } catch (e) {
    console.log(`failed to fetch novel list: ${e}`)
  }
})
