'use client'
import { useState } from 'react'

export const Experience = () => {
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
    <section>
      <div className="max-w-3xl mt-10 mx-auto flex flex-col">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
          <h3 className="text-xl md:text-2xl">Experience</h3>
          <button
            onClick={() => setShowAllWork(!showAllWork)}
            className={`
                          flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 text-sm
                          rounded-lg backdrop-blur-sm dark:bg-black/20 bg-black/5
                          text-black
                          dark:text-white
                          shadow-md
                          relative
                          transition-all duration-200
                          hover:cursor-pointer
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
                  <span className="text-base md:text-lg">@ {job.company}</span>
                </h4>
                <p className="text-sm md:text-base mb-1 md:mb-2">
                  {job.period}
                </p>
                <p className="text-sm md:text-base">{job.description}</p>
              </article>
            ),
          )}
        </div>
      </div>
    </section>
  )
}
