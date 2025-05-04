const IntroText = () => {
  return (
    <section className="max-w-3xl mx-auto flex flex-col space-y-8 sm:mt- md:mt-10 md:space-y-12 flex-1 mt-5 dark:text-zinc-100 text-zinc-900 font-mono">
      <p className="text-base md:text-lg leading-loose">
        Hi there! I&apos;m João, a passionate coder who loves creating neat UI
        experiences on the Web with a strong focus on reusability and best
        practices
      </p>
      <p className="text-base md:text-lg leading-loose">
        Beyond the screen, I also love the simplicity and joy of nature{' '}
        <span role="img" aria-label="tree">
          🌳
        </span>
        , the chilling cold from winters, the warmth from a good cup of tea{' '}
        <span role="img" aria-label="tea">
          🍵
        </span>
        , reading, yoga, and meditation{' '}
        <span role="img" aria-label="meditation">
          🧘
        </span>
      </p>
    </section>
  )
}

export default IntroText
