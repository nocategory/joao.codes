import { SocialIcon } from './types'
import Image from 'next/image'

const Social = ({
  url,
  label,
  width = 44,
  height = 44,
}: SocialIcon): JSX.Element => {
  return (
    <>
      <a
        href={url}
        className="hover:rotate-12 hover:opacity-100 opacity-80 hover:scale-125 transition-all ease-in px-4 sm:mx-2 py-4"
        aria-label={label}
      >
        <Image
          src={`/icons/${label}.svg`}
          alt={label}
          width={width}
          height={height}
        />
      </a>
    </>
  )
}

export default Social