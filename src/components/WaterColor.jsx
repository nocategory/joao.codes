import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import { useEffect, useMemo, useState } from 'react'

const WaterColor = ({ theme }) => {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    initParticlesEngine(async engine => {
      await loadSlim(engine)
    }).then(() => setReady(true))
  }, [])

  const options = useMemo(() => {
    const colors =
      theme === 'dark'
        ? ['#202424', '#2c3232', '#3a4141']
        : ['#d8d8cf', '#c8cbc0', '#b7beb2']

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
          value: colors,
        },
        shape: {
          type: 'circle',
        },
        opacity: {
          value: theme === 'dark' ? 0.55 : 0.86,
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
  }, [theme])

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

export default WaterColor
