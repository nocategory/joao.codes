const PolyworkWarn = (): JSX.Element => (
  <a href="https://www.poly.joao.codes/" className="flex justify-center fixed">
    <div className="py-3 px-5 bg-white dark:bg-[#a0a0a047] bg-opacity-[85] overflow-hidden flex w-full md:w-[60%] lg:w-[40%] xl:w-[38%] justify-evenly items-center md:rounded-bl-md md:rounded-br-md select-none text-justify fixed bottom-0 md:bottom-auto md:top-0 shadow-md border-t-2 border-gray-200 border-opacity-40 md:border-none">
      <div className="pr-3 flex flex-wrap">
        <img src="/polywork.svg" alt="polywork logo" width="52" height="52" />
      </div>
      <p className="text-[#24292e] dark:text-white">
        Hey there! If you were looking for my <b>Polywork</b> profile, click
        here!
      </p>
    </div>
  </a>
)

export default PolyworkWarn
