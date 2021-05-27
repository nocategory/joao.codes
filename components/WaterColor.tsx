import Particles from 'react-tsparticles'

// greatly inspired by Amelia Wattenberger's page @ https://wattenberger.com/
const WaterColor = (): JSX.Element => {
  return (
    <Particles
      id="tsparticles"
      canvasClassName="dark:filter dark:blur-[100px] dark:brightness-[0.5] filter blur-[100px]"
      options={{
        fpsLimit: 60,
        emitters: {
          direction: 'none',
          rate: {
            delay: 10,
            quantity: 5,
          },
        },
        particles: {
          number: {
            value: 7,
          },
          color: {
            value: [
              '#4D816A',
              '#7bb3a0',
              '#398974',
              '#025042',
              '#c9ccc1',
              '#F0ECAC',
              '#ffffff',
            ],
          },
          shape: {
            type: 'circle',
          },
          opacity: {
            value: 0.7,
          },
          size: {
            value: 180,
            anim: {
              enable: true,
              speed: 200,
              count: 1,
              size_min: 0,
              sync: true,
              startValue: 'min',
              destroy: 'none',
            },
          },
          move: {
            enable: true,
            speed: 0.4,
            direction: 'none',
            random: true,
            outModes: {
              default: 'destroy',
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
  )
}

export default WaterColor
