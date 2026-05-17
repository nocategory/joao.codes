import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import { memo, useEffect, useMemo, useState } from 'react'

const WaterColor = () => {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    initParticlesEngine(async engine => {
      await loadSlim(engine)
    }).then(() => setReady(true))
  }, [])

  const options = useMemo(() => {
    return {
      fullScreen: false,
      fpsLimit: 30,
      emitters: {
        direction: 'none',
        rate: {
          delay: 2.2,
          quantity: 1,
        },
      },
      particles: {
        number: {
          value: 4,
        },
        color: {
          value: ['#68706b', '#848a82', '#a4a99f'],
        },
        shape: {
          type: 'circle',
        },
        opacity: {
          value: 0.28,
        },
        size: {
          value: { min: 220, max: 520 },
          animation: {
            enable: true,
            speed: 55,
            count: 1,
            sync: true,
            startValue: 'random',
            destroy: 'max',
          },
        },
        move: {
          enable: true,
          speed: 0.12,
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
    }
  }, [])

  if (!ready) {
    return null
  }

  return (
    <Particles
      id="tsparticles"
      className="watercolor-canvas"
      options={options}
    />
  )
}

export default memo(WaterColor)
