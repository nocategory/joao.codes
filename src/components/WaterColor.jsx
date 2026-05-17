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
      fpsLimit: 60,
      emitters: {
        direction: 'none',
        rate: {
          delay: 1.4,
          quantity: 2,
        },
      },
      particles: {
        number: {
          value: 5,
        },
        color: {
          value: ['#68706b', '#848a82', '#a4a99f'],
        },
        shape: {
          type: 'circle',
        },
        opacity: {
          value: 0.54,
        },
        size: {
          value: { min: 180, max: 420 },
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
          speed: 0.18,
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
