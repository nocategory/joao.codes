import { RichText } from 'prismic-reactjs'
import { Data } from './types'

const IntroText = ({ prehey, hey, intro }: Data): JSX.Element => (
  <div className="text-left w-full md:w-auto overflow-hidden mb-[100px] flex flex-col">
    <h3 className="text-lg leading-loose mb-2">{RichText.asText(prehey)}</h3>
    <h1 className="text-7xl lg:text-8xl font-bold text-codes-gray-1 leading-[1em] mb-7 dark:text-white whitespace-pre-line">
      {RichText.asText(hey)}
    </h1>
    <div className="leading-relaxed max-w-[60rem] text-2xl">
      {<RichText render={intro} />}
    </div>
  </div>
)

export default IntroText
