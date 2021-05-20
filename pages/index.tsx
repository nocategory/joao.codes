import Head from 'next/head'
import PolyworkWarn from '@components/PolyworkWarn'
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
    <PolyworkWarn />
    <h1 className="text-7xl lg:text-8xl font-bold leading-[1em] mb-10">Hey!</h1>
  </Layout>
)

export default IndexPage
