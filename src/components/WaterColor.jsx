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
      fpsLimit: 45,
      particles: {
        number: {
          value: 8,
        },
        color: {
          value: ['#68706b', '#848a82', '#a4a99f'],
        },
        shape: {
          type: 'circle',
        },
        opacity: {
          value: { min: 0.26, max: 0.46 },
        },
        size: {
          value: { min: 170, max: 360 },
        },
        move: {
          enable: true,
          speed: 0.12,
          direction: 'none',
          random: true,
          outModes: {
            default: 'bounce',
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
