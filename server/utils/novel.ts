import {ScanCommand} from "@aws-sdk/client-dynamodb";
import {NovelList, NovelMetaData} from "~/types/apis/home";
import getDBClient from "~/server/utils/db";
import {getAuthorById} from "~/server/utils/author";

const genreKey = "#genre"
const genre1 = ":genre1"
const genre2 = ":genre2"
const genre3 = ":genre3"

const filterExpression1 = `contains(${genreKey}, ${genre1})`
const filterExpression2 = `contains(${genreKey}, ${genre1}) AND contains(${genreKey}, ${genre2})`
const filterExpression3 = `contains(${genreKey}, ${genre1}) AND contains(${genreKey}, ${genre2}) AND contains(${genreKey}, ${genre3})`

export async function getNovelList(genre: string[]): Promise<NovelList> {
    // var definition
    let data = []
    let total = 0
    let genreValues = {}
    let filter = {
        FilterExpression: filterExpression1, // by default only one genre to filter with
        ExpressionAttributeNames: {
            [genreKey]: "genre",
        },
        ExpressionAttributeValues: genreValues,
    }

    switch (genre.length) {
        case 1:
            filter.FilterExpression = filterExpression1;
            break;
        case 2:
            filter.FilterExpression = filterExpression2;
            break;
        case 3:
            filter.FilterExpression = filterExpression3;
            break;
    }

    if (genre.length > 0) {
        genre.forEach((v, i) => {
            genreValues[`:genre${i+1}`] = { S: v }
        })
    }

    let params = {
        TableName: "nerdy-novel",
        Limit: 16, // do not show all
    }
    if (genre.length > 0) {
        params = {
            ...params,
            ...filter,
        }
    }

    // data fetching
    try {
        const client = await getDBClient()
        // TODO: Count can be used for pagination
        const {$metadata: {httpStatusCode}, Count, Items} = await client.send(new ScanCommand(params))

        // TODO: handle the 4XX/5XX error case
        if (httpStatusCode !== 200) {
            return httpStatusCode
        }

        total = Count
        data = Items
    } catch (e: any) {
        throw createError({ statusCode: 500, statusMessage: e?.message || 'Exception from dynamodb client.' })
    }

    // for display
    const novels: Array<NovelMetaData> = []
    for (let v of data) {
        const {
            id: {S: id},
            length: {N: length},
            author_id: {N: author_id},
            genre: {SS: genre},
            synopsis: {S: synopsis},
            img_url: {S: imageUrl},
            title: {S: title},
            updated_at: {N: updatedAt},
        } = v
        const author = await getAuthorById(author_id)

        const novel = {
            id,
            length,
            categories: genre,
            description: synopsis,
            title,
            author: author?.name || "unknown",
            imageUrl,
            imageAlt: `Novel Thumbnail ${id}`,
            updatedAt,
        }

        novels.push(novel)
    }
    return {
        total,
        novels,
    }
}
