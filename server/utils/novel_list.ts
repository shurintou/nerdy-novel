import {ScanCommand} from "@aws-sdk/client-dynamodb";
import {NovelMetaData} from "~/types/apis/home";
import getDBClient from "~/server/utils/db";

export async function getNovelList() {
    // var definition
    let data = []

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
            title: {S: title},
            updated_at: {N: updated_at},
        } = v
        novels.push({
            id,
            author: author_id,
            category: genre,
            description: synopsis,
            title,
            imageUrl: 'https://bookcover.yuewen.com/qdbimg/349573/1035114945/90.webp',
            imageAlt: `Novel Thumbnail ${id}`,
            updatedAt: new Date(updated_at).toDateString(),
        })
    }
    return novels
}
