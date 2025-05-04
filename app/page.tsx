import { Experience } from '@components/Experience'
import Intro from '@components/Intro'
import IntroText from '@components/IntroText'
import '@fontsource/inter'

const IndexPage = (): JSX.Element => {
  return (
    <>
      <Intro />
      <div className="md:p-7 sm:p-10 pl-5 pr-5">
        <IntroText />
        <Experience />
      </div>
    </>
  )
}

/* This is commented out because of  current issues with Prismic, not allowing me to edit the content for this project

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
} */

export default IndexPage
