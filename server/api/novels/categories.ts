import getDBClient from "~/server/utils/db";
import {ScanCommand} from "@aws-sdk/client-dynamodb";

export default defineEventHandler(async (): Promise<Array<string>> => {
  const client = await getDBClient()
  // TODO: Count can be used for pagination
  const { $metadata: { httpStatusCode }, Items } = await client.send(new ScanCommand({
    TableName: "nerdy-novel-genre",
  }))

  // TODO: handle the 4XX/5XX error case
  if (httpStatusCode !== 200) {
    return httpStatusCode
  }

  const output: Array<string> = []
  for (let v of Items) {
    const {
      name: { S: name },
    } = v

    output.push(name)
  }

  return output
})
