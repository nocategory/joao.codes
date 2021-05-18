type Children = { children: React.ReactNode }

const Layout = ({ children }: Children): JSX.Element => (
  <div className="flex justify-center items-center h-screen">{children}</div>
)

export default Layout
