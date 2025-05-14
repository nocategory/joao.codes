'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'

export const ColorScript = () => {
  const [mounted, setMounted] = useState(false)

  const colors = useMemo(
    () => ['#4A90E2', '#50E3C2', '#F5A623', '#7ED321', '#9013FE'],
    [],
  )

  const getRandomColor = useCallback(() => {
    return colors[Math.floor(Math.random() * colors.length)]
  }, [colors])

  const setRandomLinkColor = useCallback(() => {
    if (typeof window === 'undefined') return
    Array.from(document.getElementsByTagName('a')).forEach(e => {
      e.style.textDecorationColor = getRandomColor()
      e.style.textDecorationThickness = '2.7px'
    })
  }, [getRandomColor])

  const setColorHoverListener = useCallback(() => {
    if (typeof window === 'undefined') return
    Array.from(document.querySelectorAll('a, button')).forEach(e => {
      e.addEventListener('mouseover', setRandomLinkColor)
    })
  }, [setRandomLinkColor])

  useEffect(() => {
    setMounted(true)
    setRandomLinkColor()
    setColorHoverListener()

    // Cleanup function to remove event listeners
    return () => {
      if (typeof window === 'undefined') return
      Array.from(document.querySelectorAll('a, button')).forEach(e => {
        e.removeEventListener('mouseover', setRandomLinkColor)
      })
    }
  }, [setRandomLinkColor, setColorHoverListener])

  if (!mounted) {
    return <></>
  }

  // Don't render anything until after hydration
  if (!mounted) {
    return <></>
  }

  return <></>
}
