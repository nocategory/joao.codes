import Head from 'next/head'
import { GetStaticProps } from 'next'
import PolyworkWarn from '@components/PolyworkWarn'
import Layout from '@components/Layout'
import ModeDropdown from '@components/ModeDropdown'
import IntroText from '@components/IntroText'
import Socials from '@components/Socials'
import { Client } from '../prismic'
import { Data } from '@components/types'

const IndexPage = ({ prehey, hey, intro }: Data): JSX.Element => {
  return (
    <Layout>
      <div className="z-10">
        <Head>
          {/* https://github.com/w3c/html/issues/1292 */}
          {/* eslint-disable-next-line jsx-a11y/accessible-emoji */}
          <title>João 🦄 a.k.a. nocategory</title>
          <meta name="description" content="TODO" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@200;400;700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <PolyworkWarn />
        <ModeDropdown />
        <IntroText prehey={prehey} hey={hey} intro={intro} />
        <Socials />
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const client = Client()
  const data = await client
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    .getByID(process.env.PRISMIC_ID!, {})
    .then(res => [res.data.prehey, res.data.hey, res.data.intro])

  return {
    props: {
      prehey: data[0],
      hey: data[1],
      intro: data[2],
    },
  }
}

export default IndexPage
