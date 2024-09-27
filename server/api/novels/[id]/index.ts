import { H3EventContext } from 'h3'
import { Novel, Chapter } from '@/types/apis/novels/'
import getDBClient from "~/server/utils/db";
import { QueryCommand } from "@aws-sdk/client-dynamodb";

export default defineEventHandler(async (event: H3EventContext): Promise<Novel> => {
    // fetch novel meta
    const { id } = event.context.params as { id: string }
    let novel
    let chapters: Array<Chapter> = []

    try {
        const client = await getDBClient();
        const data = await client.send(new QueryCommand({
            TableName: "nerdy-novel",
            KeyConditionExpression: "id = :id",
            ExpressionAttributeValues: {
                ":id": {
                    S: id,
                }
            }
        }))
        const { $metadata: { httpStatusCode }, Count, Items } = data

        // TODO: handle the 4XX/5XX error case
        if (httpStatusCode !== 200) {
            return httpStatusCode
        }

        if (!Count) {
            throw createError({
                statusCode: 404,
                statusMessage: '数据未找到'
            })
        }

        novel = Items[0]
    } catch (e: any) {
        throw createError({ statusCode: 500, statusMessage: e?.message || 'Exception from dynamodb client.' })
    }

    // fetch novel chapters
    try {
        const client = await getDBClient();
        const data = await client.send(new QueryCommand({
            TableName: "nerdy-novel-chapters",
            KeyConditionExpression: "novel_id = :novel_id",
            ExpressionAttributeValues: {
                ":novel_id": {
                    S: id,
                }
            }
        }))
        const { $metadata: { httpStatusCode }, Count, Items } = data

        // TODO: handle the 4XX/5XX error case
        if (httpStatusCode !== 200) {
            return httpStatusCode
        }
        if (!Count) {
            throw createError({
                statusCode: 404,
                statusMessage: '数据未找到'
            })
        }

        for (let chapter of Items) {
            const {
                id: { N: id },
                title: { S: title },
                content: { S: content },
            } = chapter

            chapters.push({
                id: `${id}`,
                title,
                content: `${content}`, // TODO: styling
                order: id,
                createdAt: '2024/01/01', // TODO: what is the timestamp of chapter
                updatedAt: '2024/09/12', // TODO: same comment as above
            })
        }
    } catch (e: any) {
        throw createError({ statusCode: 500, statusMessage: e?.message || 'Exception from dynamodb client.' })
    }

    const {
        author_id: { N: author_id },
        genre: { SS: genre },
        synopsis: { S: synopsis },
        title: { S: title },
        updated_at: { N: updatedAt },
        created_at: { N: createdAt },
        img_url: { S: imageUrl },
    } = novel

    return {
        id: `${id}`,
        author: author_id,
        categories: genre,
        description: synopsis,
        title,
        chapters,
        imageUrl,
        imageAlt: `Novel Thumbnail ${id}`,
        createdAt,
        updatedAt,
    }
})
