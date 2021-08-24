import Social from '@components/Social'

const Layout = (): JSX.Element => {
  return (
    <div className="w-max flex justify-center items-center dark:invert bg-white/40 shadow-xl m-auto lg:mt-12 md:mt-7 sm:mt-3 rounded-2xl transition-all duration-300 ease-in">
      <Social url="http://joao.run/poly" label="polywork" />
      <Social url="http://joao.run/gh" label="github" />
      <Social url="http://joao.run/twitter" label="twitter" />
    </div>
  )
}

export default Layout
