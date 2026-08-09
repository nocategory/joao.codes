import { useEffect } from 'react'
import Design8 from './designs/Design8.jsx'

function App() {
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark')
  }, [])

  return <Design8 theme="dark" />
}

export default App
