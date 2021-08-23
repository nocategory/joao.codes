import { useState, useEffect } from 'react'
import { Switch } from '@headlessui/react'
import { useTheme } from 'next-themes'
import SunIcon from '@components/icons/SunIcon'
import MoonIcon from '@components/icons/MoonIcon'

const ModeToggle = (): JSX.Element => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  // show component only after page is mounted so that theme isn't undefined (hydration mismatch)
  // https://github.com/pacocoursey/next-themes#avoid-hydration-mismatch
  useEffect(() => setMounted(true), [])

  if (!mounted) return <></>

  return (
    <div className="fixed top-7 md:right-16 right-5 flex md:scale-110 lg:scale-[1.20]">
      <button
        className={`${theme !== 'light' ? 'opacity-40' : ''}`}
        onClick={() => (theme !== 'light' ? setTheme('light') : null)}
      >
        <SunIcon />
      </button>
      <Switch
        checked={theme === 'light' ? false : true}
        onChange={
          theme === 'light' ? () => setTheme('dark') : () => setTheme('light')
        }
        defaultChecked={false}
        className={`${
          theme === 'dark' ? 'bg-white/20' : 'bg-black/40'
        } relative inline-flex items-center h-6 w-11 mx-2 rounded-full transition-all backdrop-brightness-75  hover:backdrop-brightness-50 dark:backdrop-brightness-150 dark:hover:backdrop-brightness-50`}
      >
        <span className="sr-only">Switch between light and dark theme</span>
        <span
          className={`${
            theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
          } inline-block w-4 h-4 transform bg-white/100 rounded-full transition-transform duration-300`}
        />
      </Switch>
      <button
        className={`${theme !== 'dark' ? 'opacity-40' : ''}`}
        onClick={() => (theme !== 'dark' ? setTheme('dark') : null)}
      >
        <MoonIcon />
      </button>
    </div>
  )
}

export default ModeToggle
