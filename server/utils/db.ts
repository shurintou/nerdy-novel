import {DynamoDBClient} from "@aws-sdk/client-dynamodb";

let dbClient = null

export default async function getDBClient() {
    if (dbClient === null) {
        const accessKeyId = process.env.AWS_ACCESS_KEY_ID
        const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

        dbClient = await new DynamoDBClient({
            region: "ap-northeast-1",
            // region: 'local', // Can be any valid AWS region
            // endpoint: 'http://localhost:8000', // Connect to local DynamoDB
            // credentials: {
            //     accessKeyId: 'dummyAccessKeyId', // These values can be anything when using local DynamoDB
            //     secretAccessKey: 'dummySecretAccessKey',
            // },
            credentials: {
                accessKeyId, // These values can be anything when using local DynamoDB
                secretAccessKey,
            },
        });
        return dbClient;
    }
    return dbClient
}
