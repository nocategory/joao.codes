'use client'

import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import { useEffect, useState } from 'react'

// greatly inspired by Amelia Wattenberger's page @ https://wattenberger.com/
const WaterColor = (): JSX.Element => {
  const [init, setInit] = useState(false)

  // this should be run only once per application lifetime
  useEffect(() => {
    initParticlesEngine(async engine => {
      await loadSlim(engine)
    }).then(() => {
      setInit(true)
    })
  }, [])

  return (
    <div className="relative w-full h-full">
      {init && (
        <Particles
          id="tsparticles"
          className="w-full h-full -z-10 watercolor-canvas relative dark:filter dark:blur-[90px] brightness-[0.95] filter blur-[90px] block p-0 m-0 !pointer-events-none"
          options={{
            fullScreen: false,
            fpsLimit: 60,
            emitters: {
              direction: 'none',
              rate: {
                delay: 0.5,
                quantity: 7,
              },
            },
            particles: {
              number: {
                value: 7,
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
                animation: {
                  enable: true,
                  speed: 200,
                  count: 10,
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
            },
            detectRetina: true,
          }}
        />
      )}
    </div>
  )
}

export default WaterColor
