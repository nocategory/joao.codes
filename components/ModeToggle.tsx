import MoonIcon from '@components/icons/MoonIcon'
import SunIcon from '@components/icons/SunIcon'
import { Switch } from '@headlessui/react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

const ModeToggle = (): JSX.Element => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  // show component only after page is mounted so that theme isn't undefined (hydration mismatch)
  // https://github.com/pacocoursey/next-themes#avoid-hydration-mismatch
  useEffect(() => setMounted(true), [])

  if (!mounted) return <></>

  return (
    <div className="right-4 top-4 md:right-10 md:top-6 flex items-center justify-center z-50">
      <button
        className={`${theme !== 'light' ? 'opacity-40' : ''}`}
        aria-label="Toggle color scheme to light"
        onClick={() => (theme !== 'light' ? setTheme('light') : null)}
      >
        <SunIcon />
      </button>
      <Switch
        checked={theme === 'light' ? false : true}
        aria-label="Toggle color scheme"
        onChange={
          theme === 'light' ? () => setTheme('dark') : () => setTheme('light')
        }
        defaultChecked={false}
        className={`${
          theme === 'dark' ? 'bg-white/20' : 'bg-black/40'
        } relative inline-flex items-center h-6 w-11 mx-2 rounded-full transition-all backdrop-brightness-75  hover:backdrop-brightness-50 dark:backdrop-brightness-150 dark:hover:backdrop-brightness-50`}
      >
        <span className="sr-only">
          Toggle between light and dark color schemes
        </span>
        <span
          className={`${
            theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
          } inline-block w-4 h-4 transform bg-white/100 rounded-full transition-transform duration-300`}
        />
      </Switch>
      <button
        className={`${theme !== 'dark' ? 'opacity-40' : ''}`}
        aria-label="Toggle color scheme to dark"
        onClick={() => (theme !== 'dark' ? setTheme('dark') : null)}
      >
        <MoonIcon />
      </button>
    </div>
  )
}

export default ModeToggle
