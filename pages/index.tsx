import Head from 'next/head'
import { GetStaticProps } from 'next'
import PolyworkWarn from '@components/PolyworkWarn'
import Layout from '@components/Layout'
import ModeDropdown from '@components/ModeDropdown'
import IntroText from '@components/IntroText'
import Socials from '@components/Socials'
import { Data } from '@components/types'

const IndexPage = ({ prehey, hey, intro }: Data): JSX.Element => {
  return (
    <Layout>
      <div className="z-10 animate-fadeIn">
        <Head>
          <title>João Salgueiro</title>
          <meta
            name="description"
            content="João Salgueiro's small-ish introduction"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
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
  const res = await fetch(process.env.FUNCTION_URL as string)
  const data = await res.json()
  return {
    props: {
      prehey: data.prehey,
      hey: data.hey,
      intro: data.intro,
    },
  }
}

export default IndexPage
