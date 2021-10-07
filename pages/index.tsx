import Head from 'next/head'
import { GetStaticProps } from 'next'
import * as prismic from '@prismicio/client'
import Layout from '@components/Layout'
import ModeToggle from '@components/ModeToggle'
import IntroText from '@components/IntroText'
import Socials from '@components/Socials'
import { Data, Error } from '@components/types'
import '@fontsource/inter'

const IndexPage = ({
  prehey = [],
  hey = [],
  intro = [],
  api_error = false,
}: Data & Error): JSX.Element => {
  return (
    <Layout>
      <div className="z-10">
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
        </Head>
        <ModeToggle />
        {api_error ? (
          <h1 className="leading-relaxed text-5xl text-red-500">
            Oopsie! Looks like something went wrong{' '}
            <span role="img" aria-label="eyes">
              👀
            </span>
          </h1>
        ) : (
          <>
            <IntroText prehey={prehey} hey={hey} intro={intro} />
          </>
        )}
        <Socials />
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
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

    const doc = await client.getByID(process.env.PRISMIC_ID as string)
    return {
      props: {
        prehey: doc.data.prehey,
        hey: doc.data.hey,
        intro: doc.data.intro,
      },
    }
  } catch {
    return {
      props: {
        api_error: true,
        statusCode: 500,
      },
    }
  }
}

export default IndexPage
