import Social from '@components/Social'

const Layout = (): JSX.Element => {
  return (
    <div className="w-max flex justify-center items-center dark:invert bg-white/40 shadow-xl m-auto lg:mt-12 md:mt-7 sm:mt-3 rounded-2xl transition-all duration-300 ease-in">
      <Social url="https://poly.joao.codes/" label="polywork" />
      <Social url="https://github.com/nocategory" label="github" />
      <Social url="https://twitter.com/joaodotcodes" label="twitter" />
    </div>
  )
}

export default Layout
