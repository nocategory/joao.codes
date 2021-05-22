type Children = { children: React.ReactNode }

const Layout = ({ children }: Children): JSX.Element => (
  <div className="flex flex-col justify-center items-center h-screen bg-white dark:bg-codes-gray-1">
    {children}
  </div>
)

export default Layout
