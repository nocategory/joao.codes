import PolyworkIcon from '@components/icons/PolyworkIcon'

const Layout = (): JSX.Element => {
  return (
    <div className="w-full flex justify-center items-center dark:filter dark:invert mb-[100px] md:mb-0">
      <a
        href="http://joao.run/poly"
        className="transform hover:scale-125 transition-transform ease-in px-8 py-4"
      >
        <PolyworkIcon fills={false} />
      </a>
      <a
        href="http://joao.run/gh"
        className="transform hover:scale-125 transition-transform ease-in px-8 py-4 hover:fill-current"
      >
        <img src="/icons/github.svg" alt="github" width="52" height="52" />
      </a>
      <a
        href="http://joao.run/twitter"
        className="transform hover:scale-125 transition-transform ease-in px-8 py-4"
      >
        <img src="/icons/twitter.svg" alt="twitter" width="52" height="52" />
      </a>
    </div>
  )
}

export default Layout