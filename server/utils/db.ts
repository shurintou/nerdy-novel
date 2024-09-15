import {DynamoDBClient} from "@aws-sdk/client-dynamodb";

let dbClient = null

export default async function getDBClient() {
    if (dbClient === null) {
        // must set accordingly, check: https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-envvars.html
        const accessKeyId = process.env.AWS_ACCESS_KEY_ID
        const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

        const env = process.env.NODE_ENV

        let param = {
            region: "ap-northeast-1",
        }

        // for local app accessing the live db
        if (env == "development") {
            param = {
                ...param,
                credentials: {
                    accessKeyId, // These values can be anything when using local DynamoDB
                    secretAccessKey,
                },
            }
        }

        dbClient = await new DynamoDBClient(param);
        return dbClient;
    }
    return dbClient
}
