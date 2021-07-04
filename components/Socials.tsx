import PolyworkIcon from '@components/icons/PolyworkIcon'

const Layout = (): JSX.Element => {
  return (
    <div className="w-full flex justify-center items-center dark:invert mb-[100px] md:mb-0 transition-all duration-300 ease-in">
      <a
        href="http://joao.run/poly"
        className="hover:translate-y-[-0.4rem] hover:scale-110 transition-transform ease-in px-8 py-4"
        aria-label="Polywork"
      >
        <PolyworkIcon fills={false} />
      </a>
      <a
        href="http://joao.run/gh"
        className="hover:translate-y-[-0.4rem] hover:scale-110 transition-transform ease-in px-8 py-4"
        aria-label="GitHub"
      >
        <img src="/icons/github.svg" alt="github" width="52" height="52" />
      </a>
      <a
        href="http://joao.run/twitter"
        className="hover:translate-y-[-0.4rem] hover:scale-110 transition-transform ease-in px-8 py-4"
        aria-label="Twitter"
      >
        <img src="/icons/twitter.svg" alt="twitter" width="52" height="52" />
      </a>
    </div>
  )
}

export default Layout
