import { useEffect, useSyncExternalStore } from 'react'

const KEY = 'joao.codes-theme'
const COLOURS = { dark: '#060809', light: '#f7f5f0' }
const lightQuery = '(prefers-color-scheme: light)'

const listeners = new Set()

const notify = () => {
  for (const listener of listeners) listener()
}

function saved() {
  if (typeof window === 'undefined') return null
  try {
    const value = localStorage.getItem(KEY)
    return value === 'dark' || value === 'light' ? value : null
  } catch {
    return null
  }
}

function getSnapshot() {
  if (typeof window === 'undefined') return 'dark'
  const stored = saved()
  if (stored) return stored
  return window.matchMedia(lightQuery).matches ? 'light' : 'dark'
}

function getServerSnapshot() {
  return 'dark'
}

function subscribe(callback) {
  listeners.add(callback)
  const media = window.matchMedia(lightQuery)
  media.addEventListener('change', callback)
  window.addEventListener('storage', callback)
  return () => {
    listeners.delete(callback)
    media.removeEventListener('change', callback)
    window.removeEventListener('storage', callback)
  }
}

// Dark or light: the visitor's own choice once they make one, the system setting until then.
export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  // Keep the document theme attribute and browser chrome in step with the page.
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    const meta = document.querySelector('meta[name="theme-color"]')
    if (!meta) return
    meta.content = COLOURS[theme]
  }, [theme])

  const handleToggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    document.documentElement.dataset.theme = next
    try {
      localStorage.setItem(KEY, next)
    } catch {
      /* private browsing: the choice lasts until reload */
    }
    notify()
  }

  return [theme, handleToggle]
}
