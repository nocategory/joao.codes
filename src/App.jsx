import { useEffect } from 'react'
import Portfolio from './designs/Portfolio.jsx'

function App() {
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark')
  }, [])

  return <Portfolio />
}

export default App
