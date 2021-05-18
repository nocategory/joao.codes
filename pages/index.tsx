import Head from 'next/head'
import Layout from '@components/Layout'

const IndexPage = (): JSX.Element => (
  <Layout>
    <Head>
      {/* https://github.com/w3c/html/issues/1292 */}
      {/* eslint-disable-next-line jsx-a11y/accessible-emoji */}
      <title>João 🦄 a.k.a. nocategory</title>
      <meta name="description" content="TODO" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  </Layout>
)

export default IndexPage
