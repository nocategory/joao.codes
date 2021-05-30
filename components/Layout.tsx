import WaterColor from '@components/WaterColor'
type Children = { children: React.ReactNode }

const Layout = ({ children }: Children): JSX.Element => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen py-8 lg:py-24 lg:pb-8 px-8 lg:px-0 bg-white dark:bg-codes-gray-1">
      <WaterColor />
      {children}
    </div>
  )
}

export default Layout
