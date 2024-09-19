import {ScanCommand} from "@aws-sdk/client-dynamodb";
import {NovelList, NovelMetaData} from "~/types/apis/home";
import getDBClient from "~/server/utils/db";


export async function getNovelList(): NovelList {
    // var definition
    let data = []
    let total = 0

    // data fetching
    try {
        const client = await getDBClient()
        // TODO: Count can be used for pagination
        const {$metadata: {httpStatusCode}, Count, Items} = await client.send(new ScanCommand({
            TableName: "nerdy-novel",
            Limit: 16, // do not show all
        }))

        // TODO: handle the 4XX/5XX error case
        if (httpStatusCode !== 200) {
            return httpStatusCode
        }

        total = Count
        data = Items
    } catch (e) {
        console.log(`failed to fetch novel list: ${e}`)
        return 0
    }

    // for display
    const novels: Array<NovelMetaData> = []
    for (let v of data) {
        const {
            id: {S: id},
            author_id: {N: author_id},
            genre: {SS: genre},
            synopsis: {S: synopsis},
            img_url: {S: imageUrl},
            title: {S: title},
            updated_at: {N: updated_at},
        } = v

        const updatedAt = new Date(Number(updated_at)).toDateString()
        novels.push({
            id,
            author: author_id,
            categories: genre,
            description: synopsis,
            title,
            imageUrl,
            imageAlt: `Novel Thumbnail ${id}`,
            updatedAt,
        })
    }
    return {
        total,
        novels,
    }
}
