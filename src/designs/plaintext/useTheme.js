import { useEffect, useState } from 'react'

const KEY = 'joao.codes-theme'
const COLOURS = { dark: '#060809', light: '#fcfcfc' }
const lightQuery = '(prefers-color-scheme: light)'

function saved() {
  try {
    const value = localStorage.getItem(KEY)
    return value === 'dark' || value === 'light' ? value : null
  } catch {
    return null
  }
}

// Dark or light: the visitor's own choice once they make one, the system setting until then.
export function useTheme() {
  const [choice, setChoice] = useState(saved)
  const [system, setSystem] = useState(() => (window.matchMedia(lightQuery).matches ? 'light' : 'dark'))
  const theme = choice || system

  useEffect(() => {
    const media = window.matchMedia(lightQuery)
    const update = event => setSystem(event.matches ? 'light' : 'dark')
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  // Keep the browser's own chrome in step with the page.
  useEffect(() => {
    const meta = document.querySelector('meta[name="theme-color"]')
    if (!meta) return
    const previous = meta.content
    meta.content = COLOURS[theme]
    return () => { meta.content = previous }
  }, [theme])

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setChoice(next)
    try { localStorage.setItem(KEY, next) } catch { /* private browsing: the choice lasts until reload */ }
  }

  return [theme, toggle]
}
