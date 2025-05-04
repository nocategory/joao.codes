
import WaterColor from '@components/WaterColor'
import Image from 'next/image'
import Header from './Header'

const Intro = (): JSX.Element => {
  return (
    <div className="dark:text-zinc-100 text-zinc-900 font-mono relative sm:pt-10 pb-10 pt-20">
      <div className="absolute inset-0 h-full w-full overflow-hidden">
        <WaterColor />
      </div>
      <div className="max-w-3xl mx-auto flex flex-col">
        <header className="relative flex flex-col lg:flex-row items-center gap-6 md:gap-8 mb-8 md:mb-16 md:pt-12 w-full">
          <div className="flex-1 md:text-center">
            <h1 className="lg:text-6xl md:text-4xl text-4xl font-bold mb-2 md:text-left text-center">
              João Salgueiro
            </h1>
            <h2 className="lg:text-2xl md:text-xl text-md mb-4 md:mb-6 dark:text-gray-400 text-gray-600 md:text-left text-center">
              Software Engineer based in Lisbon
            </h2>
          </div>
          <div
            className="relative w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden flex-shrink-0"
            id="header-avatar"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/avatar.jpg"
              width={192}
              height={192}
              alt="João Salgueiro Avatar"
              className="w-full h-full object-cover dark:hidden"
            />
            <Image
              src="/avatar-dark.jpeg"
              width={192}
              height={192}
              alt="João Salgueiro Avatar"
              priority
              quality={100}
              className="w-full h-full object-cover hidden dark:block"
            />
          </div>
        </header>

        <Header />
      </div>
    </div>
  )
}

export default Intro
