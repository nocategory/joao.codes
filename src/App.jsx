import { lazy, Suspense, useEffect, useState } from 'react'

const designModules = import.meta.glob('./designs/Design*.jsx')
const designNames = {
  1: 'Constellation',
  2: 'Terminal',
  3: 'Flowfield',
  4: 'Polyhedra',
  5: 'Chapters A',
  6: 'Chapters B',
  7: 'Diorama',
  8: 'Hybrid',
}

const designs = Object.fromEntries(
  Object.entries(designModules).map(([path, loader]) => {
    const id = path.match(/Design(\d+)/)[1]

    return [id, { name: designNames[id] ?? `Design ${id}`, Component: lazy(loader) }]
  }),
)

const getSystemTheme = () =>
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: light)').matches
    ? 'light'
    : 'dark'

const getInitialTheme = () => {
  if (typeof window === 'undefined') {
    return 'dark'
  }

  const stored = localStorage.getItem('theme')

  if (stored === 'light' || stored === 'dark') {
    return stored
  }

  return getSystemTheme()
}

const getDesignId = () => {
  const requested = new URLSearchParams(window.location.search).get('design')

  return designs[requested] ? requested : Object.keys(designs)[0]
}

function App() {
  const [theme, setTheme] = useState(getInitialTheme)
  const designId = getDesignId()
  const { Component } = designs[designId]

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  useEffect(() => {
    if (localStorage.getItem('theme')) {
      return
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: light)')
    const handleSystemChange = () => setTheme(getSystemTheme())

    mediaQuery.addEventListener('change', handleSystemChange)

    return () => mediaQuery.removeEventListener('change', handleSystemChange)
  }, [])

  const handleThemeToggle = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark'

    setTheme(nextTheme)
    localStorage.setItem('theme', nextTheme)
  }

  return (
    <>
      <Suspense fallback={null}>
        <Component theme={theme} />
      </Suspense>
      <aside className="design-switcher" aria-label="Design variant switcher">
        {Object.entries(designs).map(([id, design]) => (
          <a
            key={id}
            href={`?design=${id}`}
            className={id === designId ? 'is-active' : ''}
            title={design.name}
          >
            {id}
          </a>
        ))}
        <button
          type="button"
          onClick={handleThemeToggle}
          aria-pressed={theme === 'dark'}
          aria-label={theme === 'dark' ? 'Switch to light' : 'Switch to dark'}
        >
          {theme === 'dark' ? '☀' : '☾'}
        </button>
      </aside>
    </>
  )
}

export default App
