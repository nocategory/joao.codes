import Particles from 'react-tsparticles'

// greatly inspired by Amelia Wattenberger's page @ https://wattenberger.com/
const WaterColor = (): JSX.Element => {
  return (
    <Particles
      id="tsparticles"
      className="absolute w-full h-full top-0 left-0"
      canvasClassName="dark:filter dark:blur-[100px] dark:brightness-[0.7] filter blur-[100px] block p-0 m-0 !pointer-events-none"
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
            value: ['#398974', '#A19B84', '#454d54', '#495960'],
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
            speed: 0.7,
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
