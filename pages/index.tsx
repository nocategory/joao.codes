import Head from 'next/head'
import PolyworkWarn from '@components/PolyworkWarn'
import Layout from '@components/Layout'
import ModeDropdown from '@components/ModeDropdown'

const IndexPage = (): JSX.Element => {
  return (
    <Layout>
      <Head>
        {/* https://github.com/w3c/html/issues/1292 */}
        {/* eslint-disable-next-line jsx-a11y/accessible-emoji */}
        <title>João 🦄 a.k.a. nocategory</title>
        <meta name="description" content="TODO" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PolyworkWarn />
      <ModeDropdown />
      <h1 className="text-7xl lg:text-8xl font-bold leading-[1em] mb-10 dark:text-white">
        Hey!
      </h1>
    </Layout>
  )
}

export default IndexPage
