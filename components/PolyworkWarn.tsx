import PolyworkIcon from '@components/icons/PolyworkIcon'

const PolyworkWarn = (): JSX.Element => (
  <a href="https://www.poly.joao.codes/" className="flex justify-center z-10">
    <div className="py-3 px-5 bg-white dark:bg-codes-gray-3 overflow-hidden flex w-full md:w-[60%] lg:w-[40%] xl:w-[38%] justify-evenly items-center md:rounded-bl-md md:rounded-br-md select-none text-justify fixed bottom-0 md:bottom-auto md:top-0 shadow-md border-t-2 border-gray-200 border-opacity-10 md:border-none transition-all duration-300 z-10 -translate-y-full animate-slideDown">
      <div className="pr-3 flex flex-wrap">
        <PolyworkIcon fills />
      </div>
      <p className="text-codes-gray-1 dark:text-white">
        Hey there! If you were looking for my <b>Polywork</b> profile, click
        here!
      </p>
    </div>
  </a>
)

export default PolyworkWarn
