'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import Particles from 'react-tsparticles'

// greatly inspired by Amelia Wattenberger's page @ https://wattenberger.com/
const WaterColor = (): JSX.Element => {
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <></>
  }

  return (
    <div className="relative w-full h-full">
      <Particles
        key={resolvedTheme || theme}
        id="tsparticles"
        canvasClassName="watercolor-canvas w-4 relative dark:filter dark:blur-[190px] brightness-[0.95] filter blur-[190px] block p-0 m-0 !pointer-events-none"
        className="w-full h-full -z-10"
        options={{
          fullScreen: false,
          fpsLimit: 60,
          emitters: {
            direction: 'none',
            rate: {
              delay: 0.5,
              quantity: 3,
            },
          },
          particles: {
            number: {
              value: 3,
            },
            color: {
              value: ['#2A4054', '#7A817F', '#436074', '#398974'],
            },
            shape: {
              type: 'edge',
            },
            opacity: {
              value: 0.3,
            },
            size: {
              value: 150,
              anim: {
                enable: true,
                speed: 200,
                count: 1,
                size_min: 10,
                sync: true,
                startValue: 'random',
                destroy: 'none',
              },
            },
            move: {
              enable: true,
              speed: 0.7,
              direction: 'none',
              random: true,
              outModes: {
                default: 'out',
              },
            },
          },
          interactivity: {
            detectsOn: 'canvas',
            events: {
              resize: true,
            },
          },
          detectRetina: true,
        }}
      />
    </div>
  )
}

export default WaterColor
