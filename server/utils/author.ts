import {ScanCommand} from "@aws-sdk/client-dynamodb";
import getDBClient from "~/server/utils/db";
import {Author} from "~/types/models/author";

const authorCache = new Map();

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

    for (let v of Items) {
        const {
            id: {S: id},
            no: {N: no},
            name: {S: name},
            posts: {N: posts},
            created_at: {N: createdAt},
        } = v
        authorCache.set(no, {
            id, no, name, posts,  createdAt,
        })
    }
}

export async function getAuthorById(no: string): Promise<Author> {
    await fetch()
    return authorCache.get(no)
}
