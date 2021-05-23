import Prismic from '@prismicio/client'

const apiEndpoint = process.env.PRISMIC_ENDPOINT
const accessToken = process.env.PRISMIC_TOKEN

export const Client = (req = null, options = {}) =>
  Prismic.client(apiEndpoint, { accessToken })
