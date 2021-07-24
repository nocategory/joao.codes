import { Handler } from '@netlify/functions'
import fetch from 'node-fetch'
import * as prismic from '@prismicio/client'

const handler: Handler = async () => {
  let data
  try {
    const client = prismic.createClient(
      process.env.PRISMIC_ENDPOINT as string,
      {
        accessToken: process.env.PRISMIC_TOKEN,
        fetch,
      }
    )

    const ref = await client.getRefByLabel('Master')
    client.queryContentFromRef(ref.ref)

    data = await client.getByID(process.env.PRISMIC_ID as string)
  } catch (err) {
    return {
      statusCode: err.statusCode || 500,
      body: JSON.stringify({
        error: err.message,
      }),
    }
  }
  return {
    statusCode: 200,
    body: JSON.stringify(data.data),
    headers: { 'content-type': 'application/json;charset=UTF-8' },
  }
}

export { handler }
