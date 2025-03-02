import Particles from 'react-tsparticles'

// greatly inspired by Amelia Wattenberger's page @ https://wattenberger.com/
const WaterColor = (): JSX.Element => {
  return (
    <Particles
      id="tsparticles"
      className="absolute w-full h-full top-0 left-0"
      canvasClassName="dark:filter dark:blur-[190px] brightness-[0.95] filter blur-[190px] block p-0 m-0 !pointer-events-none"
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
            value: ['#2A4054', '#7A817F', '#436074', '#398974'],
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
