import { useState, useEffect } from 'react'
import { Switch, Transition } from '@headlessui/react'
import { useTheme } from 'next-themes'
import SunIcon from '@components/icons/SunIcon'
import MoonIcon from '@components/icons/MoonIcon'
import DropdownIcon from '@components/icons/DropdownIcon'

const ModeToggle = (): JSX.Element => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  useEffect(() => {
    console.log(theme)
  }, [theme])

  // show component only after page is mounted so that theme isn't undefined (hydration mismatch)
  // https://github.com/pacocoursey/next-themes#avoid-hydration-mismatch
  useEffect(() => setMounted(true), [])

  if (!mounted) return <></>

  return (
    <>
      <Switch
        checked={theme === 'light' ? false : true}
        onChange={
          theme === 'light' ? () => setTheme('dark') : () => setTheme('light')
        }
        defaultChecked={false}
        className={`${
          theme === 'dark' ? 'bg-blue-600' : 'bg-gray-200'
        } relative inline-flex items-center h-6 rounded-full w-11`}
      >
        <span className="sr-only">Enable dark theme</span>
        <span
          className={`${
            theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
          } inline-block w-4 h-4 transform bg-white rounded-full`}
        />
      </Switch>
    </>
    /** <Menu as="div" className="fixed top-7 md:right-16 right-5">
      <Menu.Button
        aria-label="change display mode"
        className="flex flex-row justify-center items-center rounded-md shadow-lg px-4 py-2 border-0 hover:mix-blend-difference focus:outline-none bg-white dark:bg-codes-gray-3 filter hover:brightness-90"
      >
        <span>{getCurrentThemeIconComponent(theme)}</span>
        <span>
          <DropdownIcon />
        </span>
      </Menu.Button>
      <Transition
        enter="transition duration-300 ease-out"
        enterFrom="transform scale-90 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-300 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-90 opacity-0"
      >
        <Menu.Items className="flex-col items-center flex w-full bg-white filter brightness-90 dark:bg-codes-gray-3 mt-4 rounded-md">
          {modes.map(mode => (
            <Menu.Item key={mode} disabled={mode === theme}>
              <button
                className={`filter hover:brightness-90 bg-white dark:bg-codes-gray-3 py-2 px-4 rounded-md w-full flex justify-center`}
                onClick={() => setTheme(mode)}
              >
                <span>{getCurrentThemeIconComponent(mode)}</span>
              </button>
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>*/
  )
}

export default ModeToggle
