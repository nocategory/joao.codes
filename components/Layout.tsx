import WaterColor from '@components/WaterColor'
type Children = { children: React.ReactNode }

const Layout = ({ children }: Children): JSX.Element => {
  return (
    <div className="relative min-h-screen flex flex-col">
      <div className="fixed inset-0 pointer-events-none">
        <WaterColor />
      </div>
      <div className="z-10 flex flex-col min-h-screen">{children}</div>
    </div>
  )
}

export default Layout
