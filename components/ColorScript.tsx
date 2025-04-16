'use client'

import { useEffect } from 'react'

export const ColorScript = () => {
  let colors = ['#4A90E2', '#50E3C2', '#F5A623', '#7ED321', '#9013FE']

  function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)]
  }

  function setRandomLinkColor() {
    if (typeof window === 'undefined') return
    Array.from(document.getElementsByTagName('a')).forEach(e => {
      e.style.textDecorationColor = getRandomColor()
      e.style.textDecorationThickness = '2.7px'
    })
  }

  function setColorHoverListener() {
    if (typeof window === 'undefined') return
    Array.from(document.querySelectorAll('a, button')).forEach(e => {
      e.addEventListener('mouseover', setRandomLinkColor)
    })
  }

  useEffect(() => {
    setRandomLinkColor()
    setColorHoverListener()
  }, [])

  return <></>
}
