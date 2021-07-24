import { Handler } from '@netlify/functions'
import fetch from 'node-fetch'
import * as prismic from '@prismicio/client'

const handler: Handler = async () => {
  const client = prismic.createClient(process.env.PRISMIC_ENDPOINT as string, {
    accessToken: process.env.PRISMIC_TOKEN,
    fetch,
  })

  const ref = await client.getRefByLabel('Master')
  client.queryContentFromRef(ref.ref)

  const data = await client.getByID(process.env.PRISMIC_ID as string)

  return {
    statusCode: 200,
    body: JSON.stringify(data.data),
    headers: { 'content-type': 'application/json;charset=UTF-8' },
  }
}

export { handler }
