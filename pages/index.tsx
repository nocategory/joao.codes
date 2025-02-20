import Layout from '@components/Layout'
import ModeToggle from '@components/ModeToggle'
import Socials from '@components/Socials'
import { Data, Error } from '@components/types'
import '@fontsource/inter'
import Image from 'next/image'
import { useState } from 'react'

const IndexPage = ({ api_error = false }: Data & Error): JSX.Element => {
  const [showAllWork, setShowAllWork] = useState(false)
  const workHistory = {
    recent: [
      {
        title: 'Developer',
        company: 'Marzee',
        period: 'Mar 2022 - Dec 2024',
        description:
          'Developing and crafting apps for clients including Malaria No More, CreativStrategies, and Canal River Trust.',
      },
      {
        title: 'Advisor',
        company: 'Polywork',
        period: 'Feb 2021 - Dec 2024',
        description: 'Providing technical guidance and strategic advice.',
      },
    ],
    all: [
      {
        title: 'Developer',
        company: 'Marzee',
        period: 'Mar 2022 - Dec 2024',
        description:
          'Developing and crafting apps for clients including Malaria No More, CreativStrategies, and Canal River Trust.',
      },
      {
        title: 'Advisor',
        company: 'Polywork',
        period: 'Feb 2021 - Dec 2024',
        description: 'Providing technical guidance and strategic advice.',
      },
      {
        title: 'Software Developer',
        company: 'Devv',
        period: 'Jan 2019 - Feb 2019',
        description: 'Full-Stack Development',
      },
      {
        title: 'Frontend Developer',
        company: 'REBIS Consulting',
        period: 'Sep 2017 - Aug 2018',
        description:
          'Built websites and tools using HTML/CSS/JS, PHP, SAP Lumira, and Java for companies like Jerónimo Martins.',
      },
    ],
  }
  return (
    <Layout>
      {/* Remove the min-h-screen here since Layout already handles it */}
      <div className="z-10 flex flex-col w-full">
        {/* Move ModeToggle inside a header for better positioning */}
        <header
          className="relative w-full flex justify-end mt-4 h-fit"
          style={{ height: 'fit-content' }}
        >
          <ModeToggle />
        </header>

        {api_error ? (
          <h1 className="leading-relaxed text-3xl md:text-5xl text-red-500 p-4 text-center">
            Oopsie! Looks like something went wrong{' '}
            <span role="img" aria-label="eyes">
              👀
            </span>
          </h1>
        ) : (
          <>
            {/* Main content container with proper spacing */}
            <div className="flex-1 bg-zinc-900 text-zinc-100 font-mono p-4 sm:p-6 md:p-8">
              <div className="max-w-3xl mx-auto flex flex-col">
                {/* Update header spacing */}
                <header className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8 mb-8 md:mb-16 md:pt-12">
                  <div className="flex-1 text-center md:text-left">
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">
                      João Salgueiro
                    </h1>
                    <h2 className="text-lg md:text-xl text-zinc-400 mb-4 md:mb-6">
                      Software Engineer based in Lisbon
                    </h2>
                  </div>
                  <div className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src="/avatar.jpg"
                      width={192}
                      height={192}
                      alt="João Salgueiro"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </header>

                <main className="space-y-8 md:space-y-12 flex-1">
                  <Socials />

                  <section className="space-y-4">
                    <p className="text-base md:text-lg leading-relaxed">
                      Hi there! I&apos;m João, a passionate coder who loves
                      creating neat UI experiences with a strong focus on
                      reusability and best practices, whether in professional
                      projects, open-source or when advising companies.
                    </p>
                    <p className="text-base md:text-lg leading-relaxed">
                      Beyond the screen, I also love the simplicity and joy of
                      nature{' '}
                      <span role="img" aria-label="tree">
                        🌳
                      </span>
                      , the chilling cold from winters, the warmth from a good
                      cup of tea{' '}
                      <span role="img" aria-label="tea">
                        🍵
                      </span>
                      , reading, yoga, and meditation{' '}
                      <span role="img" aria-label="meditation">
                        🧘
                      </span>{' '}
                      - all of which help me maintain a balanced lifestyle.
                    </p>
                  </section>

                  <section>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                      <h3 className="text-xl md:text-2xl text-zinc-300">
                        Experience
                      </h3>
                      <button
                        onClick={() => setShowAllWork(!showAllWork)}
                        className={`
                          flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 text-sm
                          rounded-lg backdrop-blur-sm bg-white/10 dark:bg-black/20
                          text-black
                          dark:text-white
                          shadow-md
                          relative
                          transition-all duration-200
                          hover:bg-opacity-80
                        `}
                      >
                        {showAllWork ? 'Show Recent' : 'Show All'}
                      </button>
                    </div>
                    <div className="space-y-4 md:space-y-6">
                      {(showAllWork ? workHistory.all : workHistory.recent).map(
                        (job, index) => (
                          <article
                            key={index}
                            className="border-l-4 border-[#398974] pl-3 md:pl-4"
                          >
                            <h4 className="text-lg md:text-xl font-semibold">
                              {job.title}{' '}
                              <span className="text-zinc-400 text-base md:text-lg">
                                @ {job.company}
                              </span>
                            </h4>
                            <p className="text-zinc-400 text-sm md:text-base mb-1 md:mb-2">
                              {job.period}
                            </p>
                            <p className="text-sm md:text-base">
                              {job.description}
                            </p>
                          </article>
                        )
                      )}
                    </div>
                  </section>
                </main>
              </div>
            </div>

            <footer className="p-4 text-sm md:text-base text-center mt-8">
              © 2025 João Salgueiro.{' '}
              <a
                href="https://github.com/nocategory/joao.codes"
                className="hover:underline"
              >
                This site is open source
              </a>{' '}
              and was built with &lt;3
            </footer>
          </>
        )}
      </div>
    </Layout>
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
