type Children = { children: React.ReactNode }

const Layout = ({ children }: Children): JSX.Element => (
  <div className="flex justify-center items-center h-screen bg-white dark:bg-[#24292e]">
    {children}
  </div>
)

export default Layout
