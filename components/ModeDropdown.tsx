import { useState, useEffect } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { useTheme } from 'next-themes'
import SunIcon from '@components/icons/SunIcon'
import MoonIcon from '@components/icons/MoonIcon'
import SystemIcon from '@components/icons/SystemIcon'
import DropdownIcon from '@components/icons/DropdownIcon'

const ModeDropdown = (): JSX.Element => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const modes = ['light', 'dark', 'system']

  // show component only after page is mounted so that theme isn't undefined
  useEffect(() => setMounted(true), [])

  if (!mounted) return <></>

  const getCurrentThemeIconComponent = (
    mode: string | undefined
  ): JSX.Element => {
    /** gets the icon component for the current theme, either set by the theme var or by the mode one for the list of modes */
    switch (mode) {
      case 'light':
        return <SunIcon />
      case 'dark':
        return <MoonIcon />
      case 'system':
        return <SystemIcon />
      default:
        return <SunIcon />
    }
  }

  return (
    <Menu as="div" className="fixed top-7 md:right-16 right-5">
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
    </Menu>
  )
}

export default ModeDropdown
