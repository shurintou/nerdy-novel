import {ScanCommand} from "@aws-sdk/client-dynamodb";
import getDBClient from "~/server/utils/db";
import {Author} from "~/types/models/author";

const authorCache = new Map()<string, Author>;

async function fetch() {
    // reload from db
    if (authorCache.size !== 0) {
        return
    }

    const client = await getDBClient()
    const params = {
        TableName: "nerdy-novel-author",
    }
    const {$metadata: {httpStatusCode}, Items} = await client.send(new ScanCommand(params))

    // TODO: handle the 4XX/5XX error case
    if (httpStatusCode !== 200) {
        return httpStatusCode
    }

    for (let v: Author of Items) {
        const {
            id: {S: id},
            name: {S: name},
            posts: {N: posts},
            created_at: {N: createdAt},
        } = v
        authorCache.set(id, {
            id, name, posts,  createdAt,
        })
    }
}

export async function getAuthorById(id: string): Promise<Author> {
    await fetch()
    return authorCache.get(id)
}
