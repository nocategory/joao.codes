import Image from 'next/image'

const PolyworkWarn = (): JSX.Element => (
  <a href="https://www.poly.joao.codes/" className="flex justify-center">
    <div className="py-3 px-5 bg-white bg-opacity-80 overflow-hidden flex w-full md:w-[60%] lg:w-[40%] xl:w-[38%] justify-evenly items-center md:rounded-bl-md md:rounded-br-md select-none text-justify fixed top-0 shadow-md">
      <div className="pr-3 flex flex-wrap">
        <Image src="/polywork.svg" width={52} height={52} />
      </div>
      <p>
        Hey there! If you were looking for my <b>Polywork</b> profile, click me!
      </p>
    </div>
  </a>
)

export default PolyworkWarn
